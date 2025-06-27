import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function AboutMissionVision() {
  return (
    <section
      id="mission"
      className="w-full bg-[#8e44ad] py-12 text-white md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Our Mission & Vision
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-white text-[#333333]">
            <CardHeader>
              <CardTitle className="text-[#8e44ad]">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To advance computing as a science and profession by fostering
                the open exchange of information, promoting the highest
                professional and ethical standards, and recognizing technical
                excellence.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white text-[#333333]">
            <CardHeader>
              <CardTitle className="text-[#8e44ad]">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To be the premier organization for computing professionals,
                driving innovation and excellence in the field of computer
                science and technology, and inspiring the next generation of
                tech leaders.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
