// Etiquetas y recorte del mensaje
export const senderLabels: Record<string, string> = {
  'Direct Manager': 'Direct Manager',
  'Senior Director': 'Senior Director / Executive',
  'Peer Colleague': 'Peer Colleague',
  'HR Representative': 'People Ops / HR',
};

export const channelLabels: Record<string, string> = {
  Slack: 'Slack',
  Teams: 'Microsoft Teams',
  Email: 'Email',
};

export const excerpt = (text: string) => {
  const flat = text.trim().replace(/\s+/g, ' ');
  return flat.length > 80 ? `${flat.slice(0, 80).trimEnd()}…` : flat;
};
