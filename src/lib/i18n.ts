export type SupportedLanguage = 'en-US' | 'hi-IN' | 'te-IN';

const translations: Record<Exclude<SupportedLanguage, 'en-US'>, Record<string, string>> = {
  'hi-IN': {
    'Consensus & Papers': 'सहमति और शोधपत्र',
    'Literature Matrix': 'साहित्य मैट्रिक्स',
    'Paper Database': 'शोधपत्र डेटाबेस',
    'Research Gaps': 'शोध अंतराल',
    'Limitation Clusters': 'सीमा समूह',
    'Research Directions': 'शोध दिशाएं',
    'Literature Assistant': 'साहित्य सहायक',
    'Consensus': 'सहमति',
    'Matrix': 'मैट्रिक्स',
    'Papers': 'शोधपत्र',
    'Gaps': 'अंतराल',
    'Limitations': 'सीमाएं',
    'Directions': 'दिशाएं',
    'Assistant': 'सहायक',
    'English': 'अंग्रेज़ी',
    'Hindi': 'हिंदी',
    'Telugu': 'तेलुगु',
    'Search': 'खोजें',
    'Analyze': 'विश्लेषण करें',
    'Overview': 'अवलोकन',
    'Download': 'डाउनलोड',
    'Back': 'वापस',
    'Settings': 'सेटिंग्स',
    'Help': 'सहायता',
    'Sign in': 'साइन इन',
    'Sign up': 'साइन अप',
    'Sign out': 'साइन आउट',
    'Upload PDF': 'PDF अपलोड करें',
    'Ask a follow-up question': 'अनुवर्ती प्रश्न पूछें',
    'No papers found': 'कोई शोधपत्र नहीं मिला',
  },
  'te-IN': {
    'Consensus & Papers': 'ఏకాభిప్రాయం మరియు పరిశోధనా పత్రాలు',
    'Literature Matrix': 'సాహిత్య మ్యాట్రిక్స్',
    'Paper Database': 'పరిశోధనా పత్రాల డేటాబేస్',
    'Research Gaps': 'పరిశోధనా అంతరాలు',
    'Limitation Clusters': 'పరిమితుల సమూహాలు',
    'Research Directions': 'పరిశోధనా దిశలు',
    'Literature Assistant': 'సాహిత్య సహాయకుడు',
    'Consensus': 'ఏకాభిప్రాయం',
    'Matrix': 'మ్యాట్రిక్స్',
    'Papers': 'పత్రాలు',
    'Gaps': 'అంతరాలు',
    'Limitations': 'పరిమితులు',
    'Directions': 'దిశలు',
    'Assistant': 'సహాయకుడు',
    'English': 'ఇంగ్లీష్',
    'Hindi': 'హిందీ',
    'Telugu': 'తెలుగు',
    'Search': 'శోధించు',
    'Analyze': 'విశ్లేషించు',
    'Overview': 'అవలోకనం',
    'Download': 'డౌన్‌లోడ్',
    'Back': 'వెనుకకు',
    'Settings': 'సెట్టింగ్‌లు',
    'Help': 'సహాయం',
    'Sign in': 'సైన్ ఇన్',
    'Sign up': 'సైన్ అప్',
    'Sign out': 'సైన్ అవుట్',
    'Upload PDF': 'PDF అప్‌లోడ్ చేయండి',
    'Ask a follow-up question': 'తదుపరి ప్రశ్న అడగండి',
    'No papers found': 'పరిశోధనా పత్రాలు కనబడలేదు',
  },
};

const originalText = new WeakMap<Text, string>();

export function translateText(text: string, language: SupportedLanguage): string {
  if (language === 'en-US') return text;
  return translations[language][text] || text;
}

export function translateDocument(language: SupportedLanguage): void {
  if (typeof document === 'undefined') return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  for (const textNode of nodes) {
    if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue || '');
    const source = originalText.get(textNode) || '';
    const value = source.trim();
    if (!value || value.length > 80 || textNode.parentElement?.closest('script,style,textarea,input')) continue;
    const translated = translateText(value, language);
    textNode.nodeValue = source.replace(value, translated);
  }
}
