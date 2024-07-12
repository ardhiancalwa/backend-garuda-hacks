class Project {
    constructor(idProject, logoProject, nameProject, company, level, description, skills, rating) {
        this.idProject = idProject,
        this.logoProject = logoProject,
        this.nameProject = nameProject,
        this.company = company,
        this.level = level,
        this.description = description,
        this.skills = skills,
        this.rating = rating
    }
}

module.exports = Project;