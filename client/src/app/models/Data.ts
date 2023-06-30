export class Page1 {
    FullName?: string;
    About?: string;
    Phone?: string;
    Email?: string;
    LinkedIn?: string;
}

export class Page2 {
    arrLanguage?: Language[];
    arrSkils?:Language[];
}

export class Page3 {
    ArrEducation?: Education[];
}

class Language {
    Name?: string;
    Value?: number;
}

class Education {
    Data?: EducationData[];
    Headline?: string;
}

class EducationData {
    EducationName?: string;
    StartWork?: Date | string;
    EndWork?: Date |string;
    Content?: string;
    EducationAddres?: string;
    Position?: string;
}


export class UserDataSave{
  Token:string;
  page1:string;
  page2:string;
  page3:string;
  type:string;
}
export class DataFromDataBase extends UserDataSave{
 url:string;
 email:string;
 message:string
}

