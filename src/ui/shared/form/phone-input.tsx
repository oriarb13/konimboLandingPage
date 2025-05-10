import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/ui/shadCN/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/shadCN/command";
import { Input } from "@/ui/shadCN/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/shadCN/popover";
import { ScrollArea } from "@/ui/shadCN/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (
      value: RPNInput.Value,
      metadata?: { prefix: string; number: string }
    ) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      const [selectedCountry, setSelectedCountry] = React.useState(
        props.defaultCountry
      );

      // Function to extract prefix from country code
      const getPrefix = (country: RPNInput.Country) => {
        if (!country) return "";
        return `+${RPNInput.getCountryCallingCode(country)}`;
      };

      // Function to extract number without prefix
      const extractNumber = (fullNumber: string, prefix: string) => {
        if (!fullNumber) return "";
        // Remove the prefix from the full number
        return fullNumber.replace(prefix, "").replace(/\D/g, "");
      };

      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex items-center rtl:flex-row-reverse", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          country={selectedCountry}
          onCountryChange={(country) => {
            setSelectedCountry(country);
            // When country changes, update the prefix in the parent component
            if (props.value && country) {
              const prefix = getPrefix(country);
              const number = extractNumber(props.value, prefix);
              // @ts-expect-error - onChange is optional
              onChange?.(props.value, { prefix, number });
            }
          }}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => {
            if (value || value === "") {
              const phoneValue = value || ("" as RPNInput.Value);
              // @ts-expect-error - onChange is optional
              const prefix = getPrefix(selectedCountry);
              const number = extractNumber(phoneValue, prefix);
              onChange?.(phoneValue, { prefix, number });
            }
          }}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    maxLength={16}
    className={cn(
      "rounded-e-lg rounded-s-none lg:h-8 2xl:h-8 border border-gray-400 border-l-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="xs:py-1 lg:py-0 flex gap-1 rounded-e-none rounded-s-lg rtl:rounded-s-none rtl:rounded-e-lg border-gray-400 bg- px-3 focus:z-10  border "
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea
              className="h-72 overflow-y-auto scroll-smooth"
              onWheel={(e) => e.stopPropagation()} // Prevents parent scroll interception
            >
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
