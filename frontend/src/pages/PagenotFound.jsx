import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/card";
import { Ghost } from "lucide-react"; 
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const PagenotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-lg text-center p-6">
        <CardHeader className="flex flex-col items-center gap-2">
          <Avatar className="bg-red-100">
            <AvatarFallback>
              <Ghost className="w-6 h-6 text-red-500" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">404 - Page Not Found</CardTitle>
          <CardDescription className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 mt-6">
          <Button onClick={() => navigate("/")} variant="default">
            Go to Home
          </Button>
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default PagenotFound