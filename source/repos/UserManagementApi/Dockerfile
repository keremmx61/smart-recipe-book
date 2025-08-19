# SDK (build için)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["UserManagementApi/UserManagementApi.csproj", "UserManagementApi/"]
RUN dotnet restore "UserManagementApi/UserManagementApi.csproj"
COPY . .
WORKDIR "/src/UserManagementApi"
RUN dotnet publish "UserManagementApi.csproj" -c Release -o /app/publish

# ASP.NET Core Runtime (çalıştırmak için)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "UserManagementApi.dll"]