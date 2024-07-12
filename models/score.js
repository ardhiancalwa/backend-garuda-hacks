class Score {
    constructor(idProject, idMentor, idUser, score, feedbackCV, feedbackProject) {
        this.idProject = idProject,
        this.idMentor = idMentor,
        this.idUser = idUser,
        this.score = score,
        this.feedbackCV = feedbackCV,
        this.feedbackProject = feedbackProject
    }
}

module.exports = Score;