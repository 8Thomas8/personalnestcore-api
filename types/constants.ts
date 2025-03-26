// Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.

export const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const usernameReg = /^[a-zA-Z0-9_]{3,32}$/

export enum DrugUnit {
  Mg = 'mg',
  G = 'g',
  Kg = 'kg',
  Ml = 'ml',
  L = 'l',
  Mcg = 'µg',
  Oz = 'oz',
  Lb = 'lb',
  FlOz = 'fl oz',
  Pt = 'pt',
  Qt = 'qt',
  Gal = 'gal',
  Tbsp = 'tbsp',
  Tsp = 'tsp',
  Unit = 'unit',
}

export enum DrugForm {
  Tablets = 'tablets',
  Capsules = 'capsules',
  Syrup = 'syrup',
  Injection = 'injection',
  Inhaler = 'inhaler',
  Cream = 'cream',
  Ointment = 'ointment',
  Gel = 'gel',
  Drops = 'drops',
  Suppository = 'suppository',
  Solution = 'solution',
  Suspension = 'suspension',
  Spray = 'spray',
  Patch = 'patch',
  Lozenge = 'lozenge',
  Powder = 'powder',
  Granules = 'granules',
  Paste = 'paste',
  Lotion = 'lotion',
  Shampoo = 'shampoo',
  Foam = 'foam',
  Emulsion = 'emulsion',
  Mouthwash = 'mouthwash',
  Gargle = 'gargle',
  Enema = 'enema',
  VaginalCream = 'vaginal cream',
  VaginalTablet = 'vaginal tablet',
  VaginalGel = 'vaginal gel',
  VaginalSuppository = 'vaginal suppository',
  VaginalRing = 'vaginal ring',
  VaginalInsert = 'vaginal insert',
  VaginalCapsule = 'vaginal capsule',
  VaginalFoam = 'vaginal foam',
  VaginalOintment = 'vaginal ointment',
  VaginalSpray = 'vaginal spray',
  VaginalDouche = 'vaginal douche',
  VaginalWash = 'vaginal wash',
  VaginalSolution = 'vaginal solution',
  VaginalEmulsion = 'vaginal emulsion',
  VaginalLotion = 'vaginal lotion',
  VaginalPowder = 'vaginal powder',
  VaginalGranules = 'vaginal granules',
  VaginalPaste = 'vaginal paste',
  VaginalLozenge = 'vaginal lozenge',
  VaginalPatch = 'vaginal patch',
  VaginalDrops = 'vaginal drops',
  VaginalSuspension = 'vaginal suspension',
}

export enum UserRole {
  User = 'ROLE_USER',
  Admin = 'ROLE_ADMIN',
}

export enum CustomRecordView {
  Calendar = 'CALENDAR',
}
