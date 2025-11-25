from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_style = False
        self.in_script = False
        
    def handle_starttag(self, tag, attrs):
        if tag == 'style' or tag == 'script':
            self.in_style = True
            self.in_script = True
            
    def handle_endtag(self, tag):
        if tag == 'style' or tag == 'script':
            self.in_style = False
            self.in_script = False
            
    def handle_data(self, data):
        if not self.in_style and not self.in_script:
            text = data.strip()
            if text and len(text) > 2:
                self.text.append(text)

parser = TextExtractor()
with open('../Tr - Tarf.html', 'r', encoding='utf-8') as f:
    content = f.read()
    parser.feed(content)

# İlk 200 metin satırını yazdır
for i, text in enumerate(parser.text[:200]):
    print(f"{i+1}. {text}")