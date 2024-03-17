class TemplateService {
  constructor (templatesPath, readFile) {
    // get all templates object from template file
    this.templates = JSON.parse(readFile(templatesPath, "utf8"));
  }

  getMailTemplate (templateName, emailFrom, file) {
    const template = this.templates[templateName];
    template.from = emailFrom;
    template.attachments = [
      {
        filename: file.name,
        path: file.path
      }
    ];
    return template;
  }
}

export default TemplateService;
