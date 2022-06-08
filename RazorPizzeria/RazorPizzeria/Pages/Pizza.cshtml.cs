using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorPizzeria.Models;

namespace RazorPizzeria.Pages
{
    public class PizzaModel : PageModel
    {
        public List<PizzasModel> FakePizzaDb = new List<PizzasModel>()
        {
            new PizzasModel(){ImageTitle = "Margerita", PizzaName = "Margerita", BasePrice = 2, TomatoSauce = true, Cheese = true, FinalPrice = 4},
            new PizzasModel(){ImageTitle = "Pepperoni", PizzaName = "Pepperoni", BasePrice = 2, TomatoSauce = true, Cheese = true, Pepperoni = true, FinalPrice = 5},
            new PizzasModel(){ImageTitle = "Hawaiian", PizzaName = "Hawaiian", BasePrice = 2, TomatoSauce = true, Cheese = true, Ham = true, Pineapple = true, FinalPrice = 6},
            new PizzasModel(){ImageTitle = "Vegetarian", PizzaName = "Vegetarian", BasePrice = 2, TomatoSauce = true, Cheese = true, Pineapple = true, FinalPrice = 5},
            new PizzasModel(){ImageTitle = "Seafood", PizzaName = "Sea food", BasePrice = 2, TomatoSauce = true, Cheese = true, Tuna = true, Mushroom = true, FinalPrice = 6},
            new PizzasModel(){ImageTitle = "MeatFeast", PizzaName = "Meat feast", BasePrice = 2, TomatoSauce = true, Cheese = true, Pepperoni = true, Ham = true, Beef = true, FinalPrice = 7},
            new PizzasModel(){ImageTitle = "Carbonara", PizzaName = "Carbonara", BasePrice = 2, TomatoSauce = true, Cheese = true, Ham = true, FinalPrice = 5},
            new PizzasModel(){ImageTitle = "Bolognese", PizzaName = "Bolognese", BasePrice = 2, TomatoSauce = true, Cheese = true, Beef = true, Mushroom = true, FinalPrice = 6},
            new PizzasModel(){ImageTitle = "Mushroom", PizzaName = "Mushroom", BasePrice = 2, TomatoSauce = true, Cheese = true, Beef = true, Ham = true, Mushroom = true, FinalPrice = 7}
        };
        public void OnGet()
        {

        }
    }
}
