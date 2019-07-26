class Product:

    def __init__(self, name, img, old_price, final_price, on_sale, sku, ref_number):
        self.name = name
        self.img = img
        self.old_price = old_price
        self.final_price = final_price
        self.on_sale = on_sale
        self.sku = sku
        self.ref_number = ref_number

    def __str__(self):
        if self.on_sale:
            text =  (
                "Name: {0}.\n"
                "Img: {1}.\n"
                "On Sale: {2}\n"
                "Old Price: {3}\n"
                "Final Price: {4}\n"
                "SKU: {5}\n"
                "Reference Number: {6}\n").format(
                    self.name, 
                    self.img, 
                    self.on_sale, 
                    self.old_price, 
                    self.final_price,
                    self.sku,
                    self.ref_number)
        else:
            text = (
                "Name: {0}.\n"
                "Img: {1}.\n"
                "Price: {2}\n"
                "SKU: {3}\n"
                "Reference Number: {4}\n").format(
                    self.name, 
                    self.img, 
                    self.final_price,
                    self.sku,
                    self.ref_number)

        return text