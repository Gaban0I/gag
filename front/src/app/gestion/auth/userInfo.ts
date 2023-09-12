import { Payload } from 'src/app/models/interface';

export enum DroitsGagRole {
  ROLE_RECHERCHER = '101',
  ROLE_CONSULTER_ADMIN = '102',
  ROLE_CONSULTER_SENSIBLE = '103',
  ROLE_CONSULTER_RH = '104',
  ROLE_CONSULTER_MEDICALE = '105',
  ROLE_CONSULTER_GED = '106',
  ROLE_CONSULTER_STATISTIQUE = '107',
  ROLE_DEMANDER_ARCHIVAGE = '108',
  ROLE_DEMANDER_MASSE = '109',
}

export class UserInfo {
  public droits: Array<string> = [];
  auditId!: string;
  email!: string;
  family_name!: string;
  given_name!: string;

  parseDroits(idTokenPayload: Payload) {
    if (
      Object.prototype.hasOwnProperty.call(idTokenPayload, 'droit_gag') &&
      Array.isArray((idTokenPayload as { droit_gag?: object[] })['droit_gag'])
    ) {
      for (const entry of (idTokenPayload as { droit_gag: string[] })[
        'droit_gag'
      ]) {
        this.droits.push(entry);
      }
    }
  }
  parseAuditId(idTokenPayload: Payload) {
    if (Object.prototype.hasOwnProperty.call(idTokenPayload, 'auditId')) {
      this.auditId = idTokenPayload['auditId'];
    }
  }
  parseEmail(idTokenPayload: Payload) {
    if (Object.prototype.hasOwnProperty.call(idTokenPayload, 'email')) {
      this.email = idTokenPayload['email'];
    }
  }
  parsePrenom(idTokenPayload: Payload) {
    if (Object.prototype.hasOwnProperty.call(idTokenPayload, 'given_name')) {
      this.given_name = idTokenPayload['given_name'];
    }
  }
  parseNom(idTokenPayload: Payload) {
    if (Object.prototype.hasOwnProperty.call(idTokenPayload, 'family_name')) {
      this.family_name = idTokenPayload['family_name'];
    }
  }
  hasRolerole(role: DroitsGagRole): boolean {
    let result = false;
    const index = this.droits.findIndex((droit) => droit === role);
    if (index >= 0) result = true;
    return result;
  }
}
