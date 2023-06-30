using LogicServices.Data;
using LogicServices.Dto;
using System.Text.Json;

namespace LogicServices.Services
{
    public class IdentificationService
    {
        private  DataContext _Context { get; }

        public IdentificationService(DataContext context)
        {
            _Context = context;
        }

        public async Task<ResponseLoginDTO?> loginLinkedinAsync(string _code)
        {
            var client = new HttpClient();

            var parameters = new Dictionary<string, string>
            {
               { "grant_type", "authorization_code" },
               { "code", _code },
               { "client_id", "77hcr1bqdeucqu" },
               { "client_secret", "zm1x7POG9HLq13Pv" },
               { "redirect_uri", "https://resume-ai.net/login" }
           };

            var content = new FormUrlEncodedContent(parameters);

            var response = await client.PostAsync("https://www.linkedin.com/oauth/v2/accessToken", content);

            var result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }
            var tokenResponse = JsonSerializer.Deserialize<AccessTokenResponseDto>(result);

            if (tokenResponse?.access_token != null)
            {

                var Email = await checkTokenLinkedin(tokenResponse.access_token);
                if (Email == "admin")
                {
                    System.Console.WriteLine("admin2");
                   // return new OkObjectResult(new AdminIdentification(true, tokenResponse.access_token));
                }
                else if (Email != null)
                {
                    ResponseLoginDTO responseLoginDTO=new ResponseLoginDTO();
                    responseLoginDTO.Email = Email;
                    responseLoginDTO.Token=tokenResponse.access_token;
                    // await DataUser.GetUserData(Email, tokenResponse.access_token));
                    return responseLoginDTO;
                }

            }
            return null;
        }

        public async Task<string> checkTokenLinkedin(string token)
        {
            var httpclient = new HttpClient();

            httpclient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

            var response1 = await httpclient.GetAsync("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))");

            var responseString = await response1.Content.ReadAsStringAsync();

            if (!response1.IsSuccessStatusCode)
            {
                return null!;
            }
            JsonDocument doc = JsonDocument.Parse(responseString);

            JsonElement root = doc.RootElement;
            JsonElement array = root.GetProperty("elements");
            foreach (JsonElement element in array.EnumerateArray())
            {
                var email = element.GetProperty("handle~").GetProperty("emailAddress").ToString();
                System.Console.WriteLine(email);
                if (email == "ari65040@gmail.com")
                {
                    System.Console.WriteLine("admin");

                    return "admin";
                }
                return email;
            }

            return null!;
        }

        public async Task<string> CheckTokenGoogle(string access_token)
        {

            var httpclient = new HttpClient();

            var parameters = new Dictionary<string, string>
            {
               { "idToken",access_token}
            };

            try
            {
                var content = new FormUrlEncodedContent(parameters);

                var response = await httpclient.PostAsync("https://oauth2.googleapis.com/tokeninfo", content);

                var result = await response.Content.ReadAsStringAsync();
                var json = JsonSerializer.Deserialize<JsonElement>(result);
                var email = json.GetProperty("email").ToString();
                if (email != null)
                {
                    return email;
                }

            }
            catch (System.Exception)
            {

            }
            return null!;
        }
    }
}
