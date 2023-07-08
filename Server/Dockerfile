# Extend the official ASP.NET Core Runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

# Set the working directory in the container
WORKDIR /app

# Copy the published output of your Web API project to the container
COPY API/bin/Release/netcoreapp3.1/publish/ .

# Copy the published output of your class library to the container
COPY LogicServices/bin/Release/netstandard2.0/publish/LogicService.dll ./LogicServices/

# Expose the port that your Web API listens on
EXPOSE 80

# Start the Web API application
ENTRYPOINT ["dotnet", "API.dll"]
