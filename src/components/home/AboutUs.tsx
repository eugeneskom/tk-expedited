import React from "react";

const GeometricBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-red-50/90 to-white/95">
      {/* Geometric shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_600px_at_70%_-10%,#FFE1E1,transparent)]"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_500px_at_0%_100%,#FFF1F1,transparent)]"></div>
    </div>
  </div>
);

const DecorativeLines = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
  </div>
);

const AboutUs = () => {
  return (
    <div className="relative min-h-[85vh] bg-red-50/30 overflow-hidden">
      <GeometricBackground />
      <DecorativeLines />

      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-red-600 text-base font-medium tracking-wider">ABOUT US</div>
                <h2 className="text-4xl font-bold text-gray-900">
                  TK Expedited LLC
                </h2>
                <p className="text-lg text-gray-700">
                  Setting New Standards in Logistics Excellence
                </p>
              </div>

              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed">
                  Based in Liberty Township, OH, we're your premier partner in the freight 
                  transportation industry. Our commitment to excellence and reliability has 
                  established us as a trusted name in logistics solutions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-red-600 font-semibold">Location</div>
                  <p className="text-gray-700">
                    4584 SNOWBIRD DR<br />
                    LIBERTY TWP, OH 45011
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-red-600 font-semibold">Contact</div>
                  <p className="text-gray-700">
                    (513) 895-9653<br />
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-red-50/5 rounded-2xl"></div>
              <div className="relative space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg shadow-red-200/50 border border-red-100/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Team</h3>
                      <p className="text-gray-700">
                        Expert staff providing 24/7 support and real-time tracking for your shipments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg shadow-red-200/50 border border-red-100/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Solutions</h3>
                      <p className="text-gray-700">
                        Tailored transportation solutions to meet your specific logistics needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg shadow-red-200/50 border border-red-100/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
                      <p className="text-gray-700">
                        Consistent, timely delivery with a proven track record of excellence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;