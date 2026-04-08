import { getAuthToken } from "./supabase";

const BASE_URL = "/api";

async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export interface Story {
  id: string;
  title: string;
  genre: string;
  description: string;
  longDescription: string;
  coverGradient: string;
  coverImage?: string;
  tags: string[];
  rating: string;
  chapterCount: number;
  readingTime: string;
  featured: boolean;
  rank: number | null;
  initialPrompt: string;
}

export interface Choice {
  id: string;
  text: string;
  consequence?: string;
}

export interface StoryNode {
  id: string;
  sessionId: string;
  parentNodeId: string | null;
  choiceMade: string | null;
  narrativeText: string;
  choices: Choice[];
  nodeIndex: number;
  createdAt: string;
}

export interface StorySession {
  id: string;
  storyId: string;
  userId: string;
  status: string;
  currentNodeId: string | null;
  nodeCount: number;
  createdAt: string;
  updatedAt: string;
  story: Story;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface PremiumStatus {
  isPremium: boolean;
  expiresAt?: string;
  plan?: string;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  plan: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  expiresAt: string;
  plan: string;
}

export const api = {
  stories: {
    list: () => fetchApi<{ stories: Story[] }>("/stories"),
    get: (id: string) => fetchApi<Story>(`/stories/${id}`),
  },
  sessions: {
    list: () => fetchApi<{ sessions: StorySession[] }>("/sessions"),
    create: (storyId: string) => fetchApi<StorySession>("/sessions", {
      method: "POST",
      body: JSON.stringify({ storyId }),
    }),
    get: (id: string) => fetchApi<{ session: StorySession; nodes: StoryNode[]; currentNode: StoryNode | null }>(`/sessions/${id}`),
    continue: (id: string, choiceId: string, choiceText: string) => fetchApi<StoryNode>(`/sessions/${id}/continue`, {
      method: "POST",
      body: JSON.stringify({ choiceId, choiceText }),
    }),
  },
  auth: {
    getProfile: () => fetchApi<UserProfile>("/auth/profile"),
  },
  premium: {
    status: () => fetchApi<PremiumStatus>("/premium/status"),
    createOrder: (plan: string) => fetchApi<CreateOrderResponse>("/premium/create-order", {
      method: "POST",
      body: JSON.stringify({ plan }),
    }),
    verifyPayment: (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
      fetchApi<VerifyPaymentResponse>("/premium/verify-payment", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
