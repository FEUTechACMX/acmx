'use client';

import { motion } from "framer-motion";
import { GithubIcon } from 'lucide-react';
import Image from "next/image";
import courseJSON from "public/data/json/courses.json";
import { useEffect, useState } from 'react';
import Spinner from "~/components/Spinner";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { env } from "~/env";
import { MAX_UNDERTAKING_IMG_SIZE, zodUndertaking } from "~/utils/zodUndertaking";
import Credits from "~/components/undertaking-generator/credits";

const AnimatedGradientBackground = () => {
    return (
        <div className="animated-gradient-container">
            <div className="gradient-blob blob-1"></div>
            <div className="gradient-blob blob-2"></div>
            <div className="gradient-blob blob-3"></div>
            <style jsx>{`
        .animated-gradient-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
          opacity: 0.5;
          filter: blur(80px);
        }

        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.35;
          mix-blend-mode: multiply;
        }

        .blob-1 {
          background: linear-gradient(to right, rgba(126, 34, 206, 0.5), rgba(192, 38, 211, 0.5));
          width: 60vw;
          height: 60vw;
          top: 20%;
          left: 5%;
          animation: blob-move-1 30s infinite ease-in-out alternate;
        }

        .blob-2 {
          background: linear-gradient(to right, rgba(219, 39, 119, 0.4), rgba(236, 72, 153, 0.4));
          width: 50vw;
          height: 50vw;
          top: 10%;
          right: 10%;
          animation: blob-move-2 40s infinite ease-in-out alternate;
        }

        .blob-3 {
          background: linear-gradient(to right, rgba(139, 92, 246, 0.4), rgba(167, 139, 250, 0.4));
          width: 55vw;
          height: 55vw;
          bottom: 5%;
          right: 20%;
          animation: blob-move-3 35s infinite ease-in-out alternate;
        }

        @keyframes blob-move-1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 10%) scale(1.05); }
          100% { transform: translate(-5%, 5%) scale(0.98); }
        }

        @keyframes blob-move-2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-7%, 5%) scale(1.1); }
          100% { transform: translate(3%, -3%) scale(0.95); }
        }

        @keyframes blob-move-3 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, -10%) scale(1.03); }
          100% { transform: translate(-3%, 8%) scale(0.95); }
        }

        @media (max-width: 768px) {
          .blob-1 {
            width: 80vw;
            height: 80vw;
          }
          .blob-2 {
            width: 70vw;
            height: 70vw;
          }
          .blob-3 {
            width: 75vw;
            height: 75vw;
          }
          .animated-gradient-container {
            filter: blur(60px);
          }
        }
      `}</style>
        </div>
    );
};

export default function Component() {
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [year, setYear] = useState('');
    const [program, setProgram] = useState('');
    const [enrollmentFormat, setEnrollmentFormat] = useState('');
    const [signatureImg, setSignatureImg] = useState<File | null>(null);
    const [idImg, setIdImg] = useState<File | null>(null);
    const [courses, setCourses] = useState<string[]>([]);
    const [complianceChecked, setComplianceChecked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredCourses = courseJSON.filter(course =>
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredCourses.length / 5);
    const paginatedCourses = filteredCourses.slice((currentPage - 1) * 5, currentPage * 5);

    function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>, setImg: (img: File) => void) {
        if (!e.target.files) {
            alert('No file selected');
            return;
        }
        const file = e.target.files[0];
        if (!file) {
            alert('Invalid file');
            return;
        }
        if (file.size > MAX_UNDERTAKING_IMG_SIZE) {
            alert(`File size exceeds ${MAX_UNDERTAKING_IMG_SIZE / 1000000}MB`);
            return;
        }
        setImg(file);
    }

    const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImgUpload(e, setSignatureImg);
    };

    const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImgUpload(e, setIdImg);
    };

    const handleCourseToggle = (courseCode: string) => {
        setCourses(prev =>
            prev.includes(courseCode)
                ? prev.filter(code => code !== courseCode)
                : [...prev, courseCode]
        );
    };

    const handleSubmit = async () => {
        const body = zodUndertaking.parse({
            fullName,
            studentNumber,
            year,
            program,
            courses,
            idImg,
            signatureImg,
            enrollmentFormat,
        });

        const formData = new FormData();
        formData.set("fullName", body.fullName);
        formData.set("studentNumber", body.studentNumber);
        formData.set("year", body.year);
        formData.set("program", body.program);
        formData.set("enrollmentFormat", body.enrollmentFormat);
        formData.set("courses", body.courses.toString());
        formData.set("idImg", body.idImg);
        formData.set("signatureImg", body.signatureImg);

        setLoading(true);
        const res = await fetch(
            `${env.NEXT_PUBLIC_HOST_URL}/api/utils/undertaking-generator`,
            {
                method: "POST",
                body: formData,
            },
        );

        if (!res.ok) {
            alert(await res.text());
            setLoading(false);
            return;
        }

        console.log("Downloading");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.download = "CONFIDENTIALITY-UNDERTAKING.zip";
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log("Downloaded");

        setLoading(false);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="container min-h-screen sm:flex items-center justify-center flex-col mx-auto px-4 py-8 max-w-4xl relative">
            <AnimatedGradientBackground />
            {loading && <Spinner />}
            <div className="flex flex-col items-center mb-4 relative z-10">
                <Image
                    src="/acm/FIT_ACM.png"
                    alt="FEU Tech ACM Logo"
                    height={80}
                    width={80}
                />
                <motion.h1
                    className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Undertaking Generator
                </motion.h1>
            </div>
            <Card className="w-full relative z-10 backdrop-blur-sm bg-opacity-80 bg-card shadow-lg">
                <CardContent className="p-6">
                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="personal" className="text-xs sm:text-sm">Your Information</TabsTrigger>
                            <TabsTrigger value="courses" className="text-xs sm:text-sm">Course Selection</TabsTrigger>
                            <TabsTrigger value="compliance" className="text-xs sm:text-sm">Compliance</TabsTrigger>
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
                                    <Input id="name" placeholder="Victor Magtanggol" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="studentNumber">Student Number</Label>
                                    <Input id="studentNumber" inputMode="numeric" placeholder="20yyxxxxx" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="year">Year</Label>
                                    <Select value={year} onValueChange={setYear}>
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st">1st Year</SelectItem>
                                            <SelectItem value="2nd">2nd Year</SelectItem>
                                            <SelectItem value="3rd">3rd Year</SelectItem>
                                            <SelectItem value="4th  ">4th Year</SelectItem>
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
                                            <SelectItem value="BSCSSE">BSCSSE</SelectItem>
                                            <SelectItem value="BSCSDS">BSCSDS</SelectItem>
                                            <SelectItem value="BSCSAI">BSCSAI</SelectItem>
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
                                            <SelectItem value="1">FEU Tech - Course Code</SelectItem>
                                            <SelectItem value="2">FEU Institute of Technology - Course Code</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="signature">Signature Upload</Label>
                                    <Input id="signature" type="file" accept="image/png, image/jpeg" onChange={handleSignatureUpload} />
                                </div>
                                <div>
                                    <Label htmlFor="id">ID Upload</Label>
                                    <Input id="id" type="file" accept="image/png, image/jpeg" onChange={handleIdUpload} />
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
                                                        checked={courses.includes(course.code)}
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
                                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I have fully read and understood the undertaking and agree to abide by the rules and regulations of the college.                                    </label>
                                </div>
                                <Button
                                    onClick={handleSubmit}
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
            <footer className="mt-8 text-center text-sm text-muted-foreground relative z-10">
                <p className="mb-2">
                    <strong>Disclaimer:</strong> This generator does not store any user data.
                </p>
                <div className="block sm:flex justify-center items-center space-x-2">
                    <div className="space-x-2">
                        <GithubIcon className="h-4 w-4 inline" />
                        <a href="https://github.com/FEUTechACMX/acmx" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                            GitHub Repository
                        </a>
                    </div>
                    <div className="space-x-2">
                        <Credits />
                    </div>
                </div>
            </footer>
        </div>
    );
}