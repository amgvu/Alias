export interface MemberThumbnailsProps {
  maxVisible: number;
  visible: Array<{ user_id: string; avatar_url: string; user_tag: string }>;
  extra: number;
}
