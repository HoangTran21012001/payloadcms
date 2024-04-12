
function extractData(document: Document) {
  const writingLinks: HTMLAnchorElement[] = Array.from(
    document.getElementsByTagName('a')
  ).filter(link => link.classList.contains('titlelink'));
  
  return writingLinks.map(link => {
    return {
      title: link.textContent || '',
      url: link.href,
    };
  });
}

export default extractData;