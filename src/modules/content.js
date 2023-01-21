module.exports = (package) => {
  const { name, description, links } = package.package
  const cleanText = description.replace(/<\/?[^>]+(>|$)/g, "")
   // Homepage: ${links?.homepage}\nGitHub: ${links?.repository}\nIssues: ${links?.bugs}
  return {
    message_text: `<b>${name}</b>\n${cleanText}\n\nPackage: ${links?.npm}`,
    parse_mode: "HTML"
  }
}