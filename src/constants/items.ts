export interface Item {
  label: string;
  value: string;
  icon?: string;
}

export const ITEMS: Item[] = [
  { label: "Slack", value: "SLACK", icon: "slack" },
  { label: "Google Docs", value: "GOOGLE_DOCS", icon: "google-docs" },
  { label: "Notion", value: "NOTION", icon: "notion" },
  { label: "Jira", value: "JIRA", icon: "jira" },
  { label: "MS Azure", value: "MS_AZURE", icon: "azure" },
];
