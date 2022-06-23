﻿using Chaebot.Client.Models;
using Discord;
using Discord.WebSocket;
using Newtonsoft.Json;

namespace Chaebot.Client
{
    public class Program
    {

        public static Task Main(string[] args) => new Program().MainAsync();

        private Task Log(LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }
        private DiscordSocketClient _client;

        public async Task MainAsync()
        {
            _client = new DiscordSocketClient();

            _client.Log += Log;

            AuthModel auth;

            using (StreamReader r = new StreamReader("../auth.json"))
            {
                string json = r.ReadToEnd();
                auth = JsonConvert.DeserializeObject<AuthModel>(json);
            }

            //  You can assign your bot token to a string, and pass that in to connect.
            //  This is, however, insecure, particularly if you plan to have your code hosted in a public repository.
            var token = auth.token;

            // Some alternative options would be to keep your token in an Environment Variable or a standalone file.
            // var token = Environment.GetEnvironmentVariable("NameOfYourEnvironmentVariable");
            // var token = File.ReadAllText("token.txt");
            // var token = JsonConvert.DeserializeObject<AConfigurationClass>(File.ReadAllText("config.json")).Token;

            await _client.LoginAsync(TokenType.Bot, token);
            await _client.StartAsync();

            // Block this task until the program is closed.
            await Task.Delay(-1);
        }
    }

}
