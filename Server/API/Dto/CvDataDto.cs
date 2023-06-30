namespace API.Dto
{   
    public class page1
    {
        public string? FullName { get; set; }
        public string? About { get; set; }
        public string? Email { get; set; }
        public string? LinkedIn { get; set; }
        public string? Phone { get; set; }
    }

    public class page2
    {
        public List<Language>? arrLanguage { get; set; }
        public List<Skill>? arrSkils { get; set; }
    }

    public class page3
    {
        public List<Education>? ArrEducation { get; set; }
    }

    public class Language
    {
        public string? Name { get; set; }
        public int? Value { get; set; }
    }

    public class Skill
    {
        public string? Name { get; set; }
        public int? Value { get; set; }
    }

    public class Education
    {
        public List<EducationData>? Data { get; set; }
        public string? Headline { get; set; }
    }

    public class EducationData
    {
        public string? EducationName { get; set; }
        public DateTime StartWork { get; set; }
        public DateTime EndWork { get; set; }
        public string? Content { get; set; }
        public string? EducationAddres { get; set; }
        public string? Position { get; set; }
    }


    public class CvDataDto
    { 

        public page1 ?Page1 { get; set; }
        public page2 ?Page2 { get; set; }
        public page3 ?Page3 { get; set; }


    }
}