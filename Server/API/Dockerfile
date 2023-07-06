# Extend the official ASP.NET Core Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0

# Set the working directory in the container
WORKDIR /app

# Copy the published output of your Web API project to the container
COPY ./bin/Debug/net7.0/publish/ .

# Copy the published output of your class library to the container
# COPY ./bin/Debug/net7.0/publish/LogicService.dll .
COPY ./bin/Debug/net7.0/publish/ ./LogicService/

# Expose the port that your Web API listens on
EXPOSE 80

# Start the Web API application
ENTRYPOINT ["dotnet", "API.dll"]
