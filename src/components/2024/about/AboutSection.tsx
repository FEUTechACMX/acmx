import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-white py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#8e44ad]">
          About ACM & ACMX
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>ACM</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The Association for Computing Machinery (ACM) is the world's
                largest educational and scientific computing society. ACM
                delivers resources that advance computing as a science and a
                profession, enabling professional development and fostering the
                computing community worldwide.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>ACMX</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ACMX is an innovative extension of ACM, focusing on cutting-edge
                technologies and forward-thinking projects. It aims to push the
                boundaries of computer science and engineering, fostering
                collaboration between industry experts and emerging talents.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
