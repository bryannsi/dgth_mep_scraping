class TemplateService {
  constructor (templatesPath, readFile) {
    // get all templates object from template file
    this.templates = JSON.parse(readFile(templatesPath, "utf8"));
  }

  getMailTemplate (templateName, emailFrom, file, htmlTable) {
    const template = this.templates[templateName];
    template.from = emailFrom;
    template.attachments = [
      {
        filename: file.name,
        path: file.path
      }
    ];
    template.html = htmlTable;
    return template;
  }
}

export default TemplateService;
