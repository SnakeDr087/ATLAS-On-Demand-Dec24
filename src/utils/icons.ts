// Centralize icon imports to reduce bundle size
import { 
  Shield, 
  User,
  Settings,
  LogOut,
  Bell,
  Calendar,
  FileText,
  Video,
  Users,
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  Mail,
  Clock,
  type LucideIcon
} from 'lucide-react';

export const Icons: Record<string, LucideIcon> = {
  Shield,
  User,
  Settings,
  LogOut,
  Bell,
  Calendar,
  FileText,
  Video,
  Users,
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  Mail,
  Clock
};

export type IconName = keyof typeof Icons;