using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
namespace WebScanner
{
    public class ControllerBase: Controller
    {

        public bool IsNumeric(string value)
        {
            double intOutPut;
            if (!double.TryParse(value, out intOutPut))
            {
                return false;
            }
            return true;
        }
    }
}