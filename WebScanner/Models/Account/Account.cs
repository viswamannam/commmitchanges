using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebScanner.Models.Account
{
    public class Account
    {           
        public string Username { get; set; }

        public string Password { get; set; }

        public string ReturnURL { get; set; }
        
    }
}