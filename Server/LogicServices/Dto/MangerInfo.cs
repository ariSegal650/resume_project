namespace LogicServices.Dto
{
    public class AllStatistics
    {
        public int? users { get; set; }
        public int? usersRegistered { get; set; }
        public int? downloads { get; set; }

        public int[] monthUsers { get; set; } = new int[12];
        public int[] monthDownloads { get; set; } = new int[12];
        //public int[] month { get; set; } = new int[12];

    }
    public class AdminIdentification
    {
        public bool admin { get; set; }=false;
        public string Token { get; set; }= string.Empty;
        public AdminIdentification(bool a,string token)
        {
            admin=a;
            Token=token;
        }
    }

}