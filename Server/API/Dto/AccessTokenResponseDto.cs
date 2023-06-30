namespace API.Dto
{
    public class AccessTokenResponseDto
    {

        public string? access_token { get; set; }
        public int expires_in { get; set; }
        public string? scope { get; set; }

        public AccessTokenResponseDto()
        {
            this.access_token = null;
            this.expires_in = 0;
            scope = null;
        }
    }
    public class Element
    {
        public Handle ?handle { get; set; }
    }

    public class Handle
    {
        public string ?emailAddress { get; set; }

        public string ?handle { get; set; }
    }

    public class ExampleData
    {
        public List<Element> ?elements { get; set; }
    }

}