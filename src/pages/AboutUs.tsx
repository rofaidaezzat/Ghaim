import { Target, Sparkles, TrendingUp, ShieldCheck, Users } from "lucide-react";
import ImageWithFallback from "../Components/ImageWithFallback";

const AboutUs = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-sans font-bold mb-6 tracking-tight">
            About Fashon
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            Redefining elegance for the modern individual through timeless style and contemporary trends.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <div className="order-2 md:order-1 relative group">
            <div className="absolute -inset-4 bg-secondary/20 rounded-3xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&fit=crop"
              alt="Fashon Story"
              className="relative rounded-3xl shadow-xl w-full object-cover aspect-[3/4]"
            />
          </div>

          {/* Story Text */}
          <div className="order-1 md:order-2">
            <div className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Where Style Meets <br />{" "}
              <span className="text-primary">Sophistication</span>
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded in 2026, Fashon began with a simple yet ambitious vision: to make high-end fashion accessible without compromising on quality. We started as a small boutique and have grown into a beloved destination for trendsetters across the region.
              </p>
              <p>
                We believe that clothing is more than just fabric—it's a form of self-expression. Our curated collections are designed to empower you, boosting your confidence whether you're at the office, a gala, or enjoying a casual weekend.
              </p>
              <p>
                From meticulous fabric selection to the final stitch, every piece in our collection tells a story of craftsmanship and passion. We are dedicated to bringing you the latest global trends while ensuring timeless elegance.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {/* Mission Card */}
          <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:bg-primary transition-colors duration-300">
                <Target className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 ml-5">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To inspire confidence and individuality through exceptional fashion. We aim to provide a seamless shopping experience where every customer feels valued and finds pieces that perfectly resonate with their personal style.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gray-50 rounded-3xl p-10 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:bg-primary transition-colors duration-300">
                <Sparkles className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 ml-5">
                Our Vision
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become the leading fashion retailer known for innovation, sustainability, and setting the standard for online shopping. We envision a world where high-quality fashion is inclusive and accessible to all.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h3>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
              The principles that drive our creativity and service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Quality Assurance
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  We determine to deliver nothing but the best. Every item undergoes rigorous quality checks to ensure durability and comfort.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Trendsetting
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  Staying ahead of the curve is in our DNA. We constantly scout global runways to bring the latest trends directly to your wardrobe.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Customer First
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  Your satisfaction is our priority. From smooth browsing to fast delivery and easy returns, we are here for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center relative py-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] leading-none text-gray-100 font-serif font-bold opacity-50 select-none z-0">
            STYLE
          </div>
          <p className="text-3xl text-gray-800 leading-relaxed font-light italic relative z-10 font-serif">
            "Fashion is the armor to survive the reality of everyday life."
          </p>
          <p className="text-lg text-primary mt-6 font-bold tracking-widest uppercase relative z-10">
            — Bill Cunningham
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
