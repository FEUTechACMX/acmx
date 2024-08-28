'use client';

import { motion } from "framer-motion";
import { GithubIcon } from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Component() {
    const [name, setName] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [year, setYear] = useState('');
    const [program, setProgram] = useState('');
    const [enrollmentFormat, setEnrollmentFormat] = useState('');
    const [signature, setSignature] = useState<File | null>(null);
    const [id, setId] = useState<File | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [complianceChecked, setComplianceChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const courses = [
        { code: 'CS101', name: 'Introduction to Computer Science' },
        { code: 'MATH201', name: 'Advanced Calculsus' },
        { code: 'ENG102', name: 'English Composition' },
        { code: 'PHYS301', name: 'Quantum Mechanics' },
        { code: 'BIO150', name: 'Cell Biology' },
        { code: 'CHEM202', name: 'Organic Chemistry' },
        { code: 'HIST105', name: 'World History' },
        { code: 'ECON201', name: 'Microeconomics' },
        { code: 'PSYCH101', name: 'Introduction to Psychology' },
        { code: 'ART110', name: 'Art History' },
    ];

    const filteredCourses = courses.filter(course =>
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredCourses.length / 5);
    const paginatedCourses = filteredCourses.slice((currentPage - 1) * 5, currentPage * 5);

    const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            alert('No file selected');
            return;
        }
        if (!e.target.files[0]) {
            alert('Invalid file');
            return;
        }
        if (e.target.files[0].size > 5000000) {
            alert('File size exceeds 5MB limit');
            return;
        }
        setSignature(e.target.files[0]);
    };

    const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            alert('No file selected');
            return;
        }
        if (!e.target.files[0]) {
            alert('Invalid file');
            return;
        }
        if (e.target.files[0].size > 5000000) {
            alert('File size exceeds 5MB limit');
            return;
        }
        setId(e.target.files[0]);
    };

    const handleCourseToggle = (courseCode: string) => {
        setSelectedCourses(prev =>
            prev.includes(courseCode)
                ? prev.filter(code => code !== courseCode)
                : [...prev, courseCode]
        );
    };

    const handleGenerate = () => {
        // Here you would implement the logic to generate the undertaking
        console.log('Generating undertaking...');
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="container w-screen h-screen flex items-center justify-center flex-col mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col items-center mb-8">
                <Image
                    src="/acm/FIT_ACM.png"
                    alt="FEU Tech ACM Logo"
                    height={100}
                    width={100}
                />
                <motion.h1
                    className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Undertaking Generator
                </motion.h1>
            </div>
            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="personal" className="text-xs sm:text-sm md:text-base">Your Information</TabsTrigger>
                            <TabsTrigger value="courses" className="text-xs sm:text-sm md:text-base">Course Selection</TabsTrigger>
                            <TabsTrigger value="compliance" className="text-xs sm:text-sm md:text-base">Compliance</TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal">
                            <motion.div
                                className="grid gap-4 sm:grid-cols-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="studentNumber">Student Number</Label>
                                    <Input id="studentNumber" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="year">Year</Label>
                                    <Select value={year} onValueChange={setYear}>
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1st Year</SelectItem>
                                            <SelectItem value="2">2nd Year</SelectItem>
                                            <SelectItem value="3">3rd Year</SelectItem>
                                            <SelectItem value="4">4th Year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="program">Program</Label>
                                    <Select value={program} onValueChange={setProgram}>
                                        <SelectTrigger id="program">
                                            <SelectValue placeholder="Select program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cs">BSCSSE</SelectItem>
                                            <SelectItem value="eng">BSCSDS</SelectItem>
                                            <SelectItem value="bus">BSCSAI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="enrollmentFormat">Enrollment Format</Label>
                                    <Select value={enrollmentFormat} onValueChange={setEnrollmentFormat}>
                                        <SelectTrigger id="enrollmentFormat">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fullTime">FEU Tech - Course Code</SelectItem>
                                            <SelectItem value="partTime">FEU Institute of Technology - Course Code</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="signature">Signature Upload</Label>
                                    <Input id="signature" type="file" accept="image/*" onChange={handleSignatureUpload} />
                                </div>
                                <div>
                                    <Label htmlFor="id">ID Upload</Label>
                                    <Input id="id" type="file" accept="image/*" onChange={handleIdUpload} />
                                </div>
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="courses">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-4">
                                    <Label htmlFor="courseSearch">Search Courses</Label>
                                    <Input
                                        id="courseSearch"
                                        placeholder="Search by course code or name"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Select</TableHead>
                                            <TableHead>Course Code</TableHead>
                                            <TableHead>Course Name</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedCourses.map((course) => (
                                            <TableRow key={course.code}>
                                                <TableCell className="font-medium">
                                                    <Checkbox
                                                        checked={selectedCourses.includes(course.code)}
                                                        onCheckedChange={() => handleCourseToggle(course.code)}
                                                    />
                                                </TableCell>
                                                <TableCell>{course.code}</TableCell>
                                                <TableCell>{course.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div className="flex justify-between items-center mt-4">
                                    <Button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span>Page {currentPage} of {pageCount}</span>
                                    <Button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                                        disabled={currentPage === pageCount}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="compliance">
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="compliance" checked={complianceChecked} onCheckedChange={() => {
                                        setComplianceChecked(prev => !prev);
                                    }} />
                                    <label
                                        htmlFor="compliance"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I have fully read and understood the undertaking and agree to abide by the rules and regulations of the college.                                    </label>
                                </div>
                                <Button
                                    onClick={handleGenerate}
                                    disabled={!complianceChecked}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                >
                                    Generate Undertaking
                                </Button>
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <footer className="mt-8 text-center text-sm text-muted-foreground">
                <p className="mb-2">
                    <strong>Disclaimer:</strong> This generator does not store any user data.
                </p>
                <div className="flex justify-center items-center space-x-2">
                    <GithubIcon className="h-4 w-4" />
                    <a href="https://github.com/your-organization" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                        GitHub Repository
                    </a>
                    <GithubIcon className="h-4 w-4" />
                    <a href="https://github.com/your-organization" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                        Contributors
                    </a>
                </div>
            </footer>
        </div>
    );
}