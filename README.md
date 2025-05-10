# Landing Page with Airtable Form Integration

[לגרסה בעברית לחץ כאן](./README.he.md)

A clean, responsive landing page built with Next.js and React, featuring a contact form that connects to Airtable for data storage.

## Features

- **Modern UI/UX**: Clean, balanced, and responsive design.
- **Contact Form**: Includes name, email, phone and message fields with zod validations and error handling.
- **Responsive Design**: Works well on all device sizes.
- **Multilingual Support**: Supports both English and Hebrew using i18next.

## Tech Stack

- **Next.js**: Modern React framework.
- **React**: UI library.
- **shadcn/ui**: Component library for stylish UI elements.
- **framer-motion**: Animation library for smooth transitions.
- **Tailwind CSS**: Utility-first CSS framework.
- **Zod**: Form validation library.
- **i18next**: Internationalization framework.
- **Airtable API**: For storing form submissions.

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- Airtable account with an existing base
- Git

### Setup Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/oriarb13/landing-page-airtable.git
   cd landing-page-airtable
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment file**:
   Copy the example environment file to create your local environment configuration:

   ```bash
   cp .env.example .env.local
   ```

4. **Configure Airtable credentials**:
   Edit the `.env.local` file and add your Airtable credentials:

   ```
   NEXT_PUBLIC_AIRTABLE_API_KEY=your_api_key
   NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id
   NEXT_PUBLIC_AIRTABLE_TABLE_NAME=your_table_name
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The project will be available at [http://localhost:3000](http://localhost:3000)

## Setting Up Airtable

### Step 1: Prepare Airtable Table

1. Log in to [Airtable](https://airtable.com/) and create an account if you don't have one.
2. Create a new base (or use an existing one).
3. Create a new table with the following fields:
   - `Full Name` (Text type)
   - `Email` (Text type)
   - `Phone` (Text type)
   - `Message` (Long text type)
   - `Created At` (Created Time)

### Step 2: Get API Credentials

1. **Get API Key**:

   - Click on your profile picture in the top right corner.
   - Select `Account`.
   - Scroll down to the `API` section.
   - Click `Generate API key` if you don't already have one.
   - Copy the API Key.

2. **Find Base ID**:

   - Open your base in Airtable.
   - Look at the URL. The Base ID is the part that appears after `/airtable.com/`.
   - For example: in `https://airtable.com/appWDeuqNA9ZLksom/...`.
   - The Base ID is `appWDeuqNA9ZLksom`.

3. **Find Table Name (ID)**:
   - Open your table in the base.
   - Look at the URL. The Table ID is the part that starts with `tbl`.
   - For example: in `https://airtable.com/app.../tblqEHmFE5Eaw9McA/...`.
   - The Table Name is `tblqEHmFE5Eaw9McA`.

### Step 3: Managing Permissions in Airtable

Make sure your API Key has proper permissions:

1. Open your base.
2. Click "Share" in the top right corner.
3. Add your API account or check that it has at least "Editor" permissions.

## Internationalization

The project uses i18next for multilingual support:

- Language switching is available in the UI.
- All text content is stored in translation files.
- Supports Right-to-Left (RTL) display for Hebrew.
- Default languages are English and Hebrew, but more can be added.

## Troubleshooting

### Issue: "Airtable connection is not working"

- Verify that your API Key, Base ID, and Table Name are correct.
- Check that you have appropriate permissions for the base.
- Make sure the table exists and contains the required fields.

### Issue: "Error submitting form"

- Check the browser console for more detailed error messages.
- Verify that the field names in your Airtable table match those in the code.

## Security and Safety

**Note:** Your Airtable API Key is sensitive and should be kept secret.

- Never commit the `.env.local` file to GitHub.
- When deploying the site, use the environment settings of your hosting provider (like Vercel or Netlify).

---

Developed by [Ori Arbeli](https://github.com/oriarb13)
