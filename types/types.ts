export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile: UserProfile | null;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar: string | null;
  bio: string;
  serviceCategory: string;
  serviceDescription: string;
  pricing: string;
  location: string;
  isAvailable: boolean;
  rating: number;
  totalJobs: number;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export interface BookingRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string | null;
  serviceId: string;
  serviceName: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'canceled';
  date: string;
  time: string;
  location: string;
  price: number;
  description: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'message' | 'payment' | 'system';
  read: boolean;
  createdAt: string;
  relatedId?: string; // ID of related booking/message/etc
}

export interface Earning {
  id: string;
  bookingId: string;
  amount: number;
  fee: number;
  net: number;
  status: 'pending' | 'paid' | 'failed';
  paidAt: string | null;
  createdAt: string;
  customerName: string;
  serviceName: string;
}