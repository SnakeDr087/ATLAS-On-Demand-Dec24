import { type ContactFormData } from '../types/contact';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxoPuGgfm-R_y03Ckr3g0xxtdK8GL3PDrstc5cMYr1zbzcuj1av8qLM0vLBP4V57mFQ/exec';

export async function submitContactForm(data: ContactFormData): Promise<boolean> {
  try {
    // Create FormData object
    const formData = new FormData();
    
    // Add all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Add timestamp
    formData.append('timestamp', new Date().toISOString());

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });

    // Since no-cors mode doesn't give us response details,
    // we'll assume success if no error was thrown
    return true;
  } catch (error) {
    console.error('Failed to submit form:', error);
    return false;
  }
}