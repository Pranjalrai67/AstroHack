import React from "react";
import {
  BriefcaseBusiness,
  Heart,
  Wallet,
  Activity,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const predictions = [
  {
    key: "career",
    label: "Career",
    icon: BriefcaseBusiness,
  },
  {
    key: "love",
    label: "Love",
    icon: Heart,
  },
  {
    key: "money",
    label: "Money",
    icon: Wallet,
  },
  {
    key: "health",
    label: "Health",
    icon: Activity,
  },
];

function getScoreColor(score) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 65) return "text-amber-400";
  return "text-rose-400";
}

function getBarColor(score) {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 65) return "bg-amber-400";
  return "bg-rose-400";
}

export default function DailyPredictionCard({ prediction }) {
  if (!prediction) return null;

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#11111a] p-6 text-white shadow-2xl">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>

              <span className="text-sm font-medium text-purple-300">
                Today's Reading
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight">
              How's your day looking?
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Your planetary energy for today
            </p>
          </div>

          <div className="text-right">
            <div
              className={`text-4xl font-bold ${getScoreColor(
                prediction.overall.score
              )}`}
            >
              {prediction.overall.score}
            </div>

            <div className="text-xs uppercase tracking-wider text-gray-500">
              Overall
            </div>
          </div>
        </div>

        {/* Overall status */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Today's energy
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getScoreColor(
                prediction.overall.score
              )} bg-white/[0.05]`}
            >
              {prediction.overall.rating}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-gray-300">
            {prediction.summary}
          </p>
        </div>

        {/* Prediction grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {predictions.map(({ key, label, icon: Icon }) => {
            const data = prediction[key];

            return (
              <div
                key={key}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]">
                      <Icon className="h-4 w-4 text-gray-300" />
                    </div>

                    <span className="text-sm font-medium text-gray-200">
                      {label}
                    </span>
                  </div>

                  <ArrowUpRight
                    className={`h-4 w-4 ${getScoreColor(
                      data.score
                    )}`}
                  />
                </div>

                <div className="flex items-end justify-between">
                  <span
                    className={`text-2xl font-bold ${getScoreColor(
                      data.score
                    )}`}
                  >
                    {data.score}
                  </span>

                  <span className="text-xs text-gray-500">
                    {data.rating}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(
                      data.score
                    )}`}
                    style={{
                      width: `${data.score}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom advice */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-purple-500/10 bg-purple-500/[0.05] p-4">
          <Sparkles className="h-4 w-4 shrink-0 text-purple-400" />

          <p className="text-xs leading-5 text-gray-400">
            Your strongest area today is{" "}
            <span className="font-medium text-gray-200">
              {getStrongestArea(prediction)}
            </span>
            . Use that energy to your advantage.
          </p>
        </div>
      </div>
    </div>
  );
}

function getStrongestArea(prediction) {
  const areas = ["career", "love", "money", "health"];

  return areas.reduce((best, current) =>
    prediction[current].score > prediction[best].score
      ? current
      : best
  );
}