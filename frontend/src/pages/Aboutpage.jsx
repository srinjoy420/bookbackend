import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "../assets/Read.png";

const Aboutpage = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className='logo'>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                                        <img
                                            src={logo}
                                            alt="ReadWrite Logo"
                                            className="w-12 h-12 object-contain"
                                        />
                                        <span className="text-xl font-bold text-gray-800">ReadWrite</span>
                                    </div>
                    
            </div>
            <p className="text-center text-lg text-muted-foreground mb-12">
                Welcome to <strong>Read and Write</strong> – your one-stop digital library where books meet passion. Whether you're a reader or a writer, we provide a space to explore, share, and grow through the power of books.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-2">📚 Discover Books</h2>
                        <p className="text-muted-foreground">Browse and search through our curated collection of books across genres and authors.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-2">✍️ Add Your Own</h2>
                        <p className="text-muted-foreground">Authors and enthusiasts can contribute their own books to the platform effortlessly.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-2">🔎 Smart Search</h2>
                        <p className="text-muted-foreground">Find books instantly with our intelligent search and filter system.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
                <p className="text-muted-foreground mb-6">
                    Read more, write more, and be part of something meaningful.
                </p>
                <Button size="lg">Explore Now</Button>
            </div>
        </div>
    )
}

export default Aboutpage