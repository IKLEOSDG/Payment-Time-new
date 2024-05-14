import React, { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export function CheckoutForm() {
  return (
    <div className="flex justify-center p-4">
      <Card className="flex-1 max-w-lg">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="flex justify-between items-center py-2">
            <div>Services *1</div>
            <div>$100</div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center font-bold py-2">
            <div>TOTAL</div>
            <div>$100</div>
          </div>
          <Button className="mt-4">Checkout</Button>
        </CardContent>
      </Card>

    </div>
  );
}

export default CheckoutForm
