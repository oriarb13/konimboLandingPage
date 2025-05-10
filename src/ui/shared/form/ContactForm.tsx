import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Button } from "@/ui/shadCN/button";
import { Input } from "@/ui/shadCN/input";
import { Label } from "@/ui/shadCN/label";
import { Textarea } from "@/ui/shadCN/textarea";
import { PhoneInput } from "@/ui/shared/form/phone-input";
import { cn } from "@/lib/utils";
import DotsLoader from "@/assets/icons/DotsLoader";
import AirtableService from "@/lib/airTable";

const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  phonePrefix: z.string().min(1, { message: "Phone prefix is required" }),
  phoneNumber: z.string().min(6, { message: "Phone number is required" }),
  message: z
    .string()
    .min(6, { message: "Message must be at least 6 characters" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Form = ({
  setIsFormOpen,
}: {
  setIsFormOpen: (isFormOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    isChecking: true,
    isConnected: false,
  });
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phonePrefix: "+972",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (
    value: string,
    metadata?: { prefix: string; number: string }
  ) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "",
      phonePrefix: metadata?.prefix || prev.phonePrefix,
      phoneNumber: metadata?.number || prev.phoneNumber,
    }));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    if (!connectionStatus.isConnected) {
      setIsFailed(true);
      setIsSubmitting(false);
      setIsSuccess(false);
      return;
    }
    //edit statuses for submitting
    setIsFailed(false);
    setIsSubmitting(true);
    setIsSuccess(false);

    const newForm = {
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      // key: "form",
    };

    try {
      const response = await AirtableService.submitForm(newForm);
      console.log(response);
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsFailed(true);
    } finally {
      setIsSubmitting(false);
      console.log(newForm);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setIsSuccess(false);
    setIsFailed(false);
    setIsSubmitting(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phonePrefix: "+972",
      phoneNumber: "",
      message: "",
    });
    setErrors({});
  };
  const handleTouchOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  //check airtable connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await AirtableService.testConnection();
        setConnectionStatus({
          isChecking: false,
          isConnected,
        });

        if (!isConnected) {
          console.warn("Airtable connection failed - check API settings");
        }
      } catch (error) {
        console.error("Airtable connection error:", error);
        setConnectionStatus({
          isChecking: false,
          isConnected: false,
        });
      }
    };

    checkConnection();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleTouchOutside}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-900">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            {t("form.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("form.description")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-gray-700 dark:text-gray-200"
                >
                  {t("form.firstNameLabel")}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t("form.firstNamePlaceholder")}
                  className={cn(
                    "bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700",
                    errors.firstName && "border-red-500"
                  )}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-gray-700 dark:text-gray-200"
                >
                  {t("form.lastNameLabel")}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t("form.lastNamePlaceholder")}
                  className={cn(
                    "bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700",
                    errors.lastName && "border-red-500"
                  )}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-200"
              >
                {t("form.emailLabel")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("form.emailPlaceholder")}
                className={cn(
                  "bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700",
                  errors.email && "border-red-500"
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2 ">
              <Label
                htmlFor="phone"
                className="text-gray-700 dark:text-gray-200"
              >
                {t("form.phoneLabel")}
              </Label>
              <PhoneInput
                value={formData.phone}
                onChange={handlePhoneChange}
                international
                initialValueFormat="national"
                defaultCountry="IL"
                className={cn(
                  "bg-white dark:bg-zinc-900 border-gray-300  dark:border-zinc-700 ",
                  errors.phone && "border-red-500"
                )}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-gray-700 dark:text-gray-200"
              >
                {t("form.messageLabel")}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("form.messagePlaceholder")}
                className={cn(
                  "resize-none min-h-[120px] bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700",
                  errors.message && "border-red-500"
                )}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            {isFailed && (
              <p className="text-center text-red-500 font-medium">
                {t("form.failed")}
              </p>
            )}

            {isSuccess && (
              <p className="text-center text-green-500 font-medium">
                {t("form.success")}
              </p>
            )}

            <div className="flex justify-center gap-20 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="min-w-[100px]"
                disabled={isSubmitting}
              >
                {t("form.cancel")}
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="min-w-[100px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? <DotsLoader size={5} /> : t("form.send")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
