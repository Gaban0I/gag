export class Error {
  errorType!: string;
  message!: string;
  class_container!: string;
  class_message!: string;
  class_background!: string;
  background_img!: string;

  verifyError(type: string): boolean {
    if (type === '404' || type === '401' || type === 'Technique') {
      return true;
    } else return false;
  }

  setError(type: string) {
    switch (type) {
      case '404':
      default: {
        this.message = "Cette page n'existe pas";
        this.errorType = '404';
        this.class_container = 'e404_container';
        this.class_message = 'e404_message';
        this.background_img = '../../../assets/images/casqueVR-3840x2560.jpg';
        this.class_background = 'boy';
        console.log('passer 404');

        break;
      }
      case '401': {
        this.message = "Vous n'êtes pas autorisé à accéder à cette application";
        this.errorType = '401';
        this.class_container = 'e401_container';
        this.class_message = 'e401_message';
        this.background_img = '../../../assets/images/fillePC_3840x2560.jpg';
        this.class_background = 'girl';
        console.log('passer 4012');
        break;
      }
      case 'Technique': {
        this.message =
          "Une erreur technique nous empêche d'afficher la page. Veuillez revenir plus tard";
        this.errorType = 'Technique';
        this.class_container = 'technique_container';
        this.class_message = 'technique_message';
        this.background_img = '../../../assets/images/travaux_3840x2561.jpg';
        this.class_background = 'girl';
        console.log('passer technique');
        break;
      }
    }
  }
}
