using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebScanner.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Product()
        {
           
            
            //SessionContext context = new SessionContext();
            //context.SetAuthenticationToken(authenticatedUser.UserId.ToString(), false, authenticatedUser);

            return View();
        }
    }
}