export interface EmailNotificationData {
  email: string;
  timestamp: Date;
}

export interface EmailServiceResponse {
  success: boolean;
  message: string;
  data?: EmailNotificationData;
}

export class EmailNotificationService {
  private static readonly STORAGE_KEY = 'hackattack_email_notifications';

  /**
   * Subscribe an email for notifications
   */
  static async subscribeEmail(email: string): Promise<EmailServiceResponse> {
    try {
      // Validate email format
      if (!this.isValidEmail(email)) {
        return {
          success: false,
          message: 'Please enter a valid email address'
        };
      }

      // Check if email already exists
      const existingEmails = this.getStoredEmails();
      if (existingEmails.some(item => item.email === email)) {
        return {
          success: false,
          message: 'This email is already subscribed!'
        };
      }

      // Create notification data
      const notificationData: EmailNotificationData = {
        email,
        timestamp: new Date()
      };

      // Store in localStorage (in a real app, this would be an API call)
      this.storeEmail(notificationData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        message: 'Successfully subscribed! We\'ll notify you when HackAttack2025 launches.',
        data: notificationData
      };
    } catch (error) {
      console.error('Email subscription error:', error);
      return {
        success: false,
        message: 'Something went wrong. Please try again later.'
      };
    }
  }

  /**
   * Get all stored email notifications
   */
  static getStoredEmails(): EmailNotificationData[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Store email notification data
   */
  private static storeEmail(data: EmailNotificationData): void {
    if (typeof window === 'undefined') return;
    
    try {
      const existing = this.getStoredEmails();
      existing.push(data);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existing));
    } catch (error) {
      console.error('Failed to store email:', error);
    }
  }

  /**
   * Validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Get subscription count
   */
  static getSubscriptionCount(): number {
    return this.getStoredEmails().length;
  }
}