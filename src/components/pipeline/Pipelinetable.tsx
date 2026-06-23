'use client';

import { Check } from 'lucide-react';

/* ─────────────────────────── Types ─────────────────────────── */
type StageStatus = 'completed' | 'active' | 'upcoming';
type PartnerType  = 'partnered' | 'inhouse' | 'undisclosed';

interface Partner {
  name: string;
  type: PartnerType;
}

interface PipelineRow {
  therapeuticClass: string;
  platformAdvantage: string | null;
  indication: string;
  stages: [StageStatus, StageStatus, StageStatus, StageStatus, StageStatus];
  partner: Partner;
}

interface StatItem {
  value: string;
  label: string;
}

interface GroupedRows {
  cls: string;
  rows: PipelineRow[];
}

/* ─────────────────────────── Data ─────────────────────────── */
const STAGES = ['Discovery', 'Preclinical', 'Phase 1', 'Phase 2', 'Phase 3'] as const;

const STATS: StatItem[] = [
  { value: '7', label: 'Active Programs' },
  { value: '2', label: 'Platform Classes' },
  { value: '2', label: 'Industrial Partners' },
  { value: '3', label: 'Phase 2+ Assets' },
];

const ROWS: PipelineRow[] = [
  {
    therapeuticClass: 'Small Molecules',
    platformAdvantage: 'Optimal release kinetics, rapid onset followed by sustained release',
    indication: 'Pain',
    stages: ['completed', 'completed', 'completed', 'active', 'upcoming'],
    partner: { name: 'Pacira', type: 'partnered' },
  },
  {
    therapeuticClass: 'Small Molecules',
    platformAdvantage: null,
    indication: 'Pain (animal health)',
    stages: ['completed', 'active', 'upcoming', 'upcoming', 'upcoming'],
    partner: { name: 'Merck Animal Health', type: 'partnered' },
  },
  {
    therapeuticClass: 'Small Molecules',
    platformAdvantage: null,
    indication: 'Oncology',
    stages: ['completed', 'active', 'upcoming', 'upcoming', 'upcoming'],
    partner: { name: 'In-House', type: 'inhouse' },
  },
  {
    therapeuticClass: 'Biologics',
    platformAdvantage: 'Improved toxicity profile',
    indication: 'Undisclosed',
    stages: ['completed', 'active', 'upcoming', 'upcoming', 'upcoming'],
    partner: { name: 'Undisclosed', type: 'undisclosed' },
  },
  {
    therapeuticClass: 'Biologics',
    platformAdvantage: null,
    indication: 'Platform',
    stages: ['completed', 'active', 'upcoming', 'upcoming', 'upcoming'],
    partner: { name: 'In-House', type: 'inhouse' },
  },
  {
    therapeuticClass: 'Biologics',
    platformAdvantage: 'Single injection',
    indication: 'Undisclosed',
    stages: ['completed', 'active', 'upcoming', 'upcoming', 'upcoming'],
    partner: { name: 'Undisclosed', type: 'undisclosed' },
  },
  {
    therapeuticClass: 'Biologics',
    platformAdvantage: 'High concentration single injection',
    indication: 'Platform',
    stages: ['active', 'upcoming', 'upcoming', 'upcoming', 'upcoming'],
    partner: { name: 'In-House', type: 'inhouse' },
  },
];

const GROUPED_ROWS: GroupedRows[] = (() => {
  const groups: GroupedRows[] = [];
  let i = 0;
  while (i < ROWS.length) {
    const cls = ROWS[i].therapeuticClass;
    const group: PipelineRow[] = [];
    while (i < ROWS.length && ROWS[i].therapeuticClass === cls) {
      group.push(ROWS[i]);
      i++;
    }
    groups.push({ cls, rows: group });
  }
  return groups;
})();

/* ─────────────────────────── Sub-components ─────────────────────────── */

function StageNode({ status }: { status: StageStatus }) {
  if (status === 'completed') {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1b3a6b] border-2 border-[#1b3a6b] flex-shrink-0">
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (status === 'active') {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-[3px] border-[#3b82c4] flex-shrink-0">
        <div className="w-3.5 h-3.5 rounded-full bg-[#3b82c4]" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#c8d4e0] flex-shrink-0" />
  );
}

function StageNodeSm({ status }: { status: StageStatus }) {
  if (status === 'completed') {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1b3a6b] border-2 border-[#1b3a6b] flex-shrink-0">
        <Check className="w-3 h-3 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (status === 'active') {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-[#3b82c4] flex-shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#3b82c4]" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#c8d4e0] flex-shrink-0" />
  );
}

function ProgressLine({ fromStatus, toStatus }: { fromStatus: StageStatus; toStatus: StageStatus }) {
  const isActive =
    fromStatus === 'completed' && (toStatus === 'active' || toStatus === 'completed');
  return (
    <div className={`flex-1 h-[2.5px] ${isActive ? 'bg-[#1b3a6b]' : 'bg-[#c8d4e0]'}`} />
  );
}

function PipelineProgress({ stages }: { stages: StageStatus[] }) {
  return (
    <div className="flex items-center w-full">
      {stages.map((status, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <StageNode status={status} />
          {i < stages.length - 1 && (
            <ProgressLine fromStatus={status} toStatus={stages[i + 1]} />
          )}
        </div>
      ))}
    </div>
  );
}

/* Compact progress bar for mobile — labels above, dots below */
function MobileProgress({ stages }: { stages: StageStatus[] }) {
  return (
    <div className="w-full">
      {/* Stage labels */}
      <div className="flex items-end mb-1">
        {STAGES.map((label, i) => (
          <div key={i} className="flex-1 last:flex-none flex justify-center">
            <span className="text-[9px] leading-tight text-center text-[#4a5e72] font-medium px-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Nodes + connectors */}
      <div className="flex items-center w-full">
        {stages.map((status, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <StageNodeSm status={status} />
            {i < stages.length - 1 && (
              <ProgressLine fromStatus={status} toStatus={stages[i + 1]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnerBadge({ name, type }: { name: string; type: PartnerType }) {
  if (type === 'partnered') {
    return (
      <span className="inline-block px-3 py-1 rounded border-2 border-[#3b9bb8] text-[#1b3a6b] text-xs font-semibold bg-white whitespace-nowrap">
        {name}
      </span>
    );
  }
  if (type === 'inhouse') {
    return (
      <span className="inline-block px-3 py-1 rounded border border-[#b0bfcc] text-[#4a5e72] text-xs font-medium bg-white whitespace-nowrap">
        In-House
      </span>
    );
  }
  return (
    <span className="inline-block px-3 py-1 rounded border border-[#b0bfcc] text-[#4a5e72] text-xs font-medium bg-white whitespace-nowrap">
      Undisclosed
    </span>
  );
}

/* ─────────────────────────── Main Page ─────────────────────────── */
export default function PipelinePage() {
  return (
    <div className="font-sans mt-15 md:mt-20">

      {/* ══════════════ HERO ══════════════ */}
      <div className="bg-[#0b2045] px-5 sm:px-10 lg:px-16 pt-8 pb-10 sm:pt-14 sm:pb-16">
        <p className="text-[#2ec4f0] text-xs sm:text-base font-medium tracking-wide mb-5 sm:mb-8">
          AmacaThera&nbsp;·&nbsp;Clinical Development Portfolio
        </p>
        <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-light leading-tight tracking-tight mb-3 sm:mb-5">
          Pipeline Overview
        </h1>
        <p className="text-[#8aa8c8] text-sm sm:text-lg font-light tracking-wide">
          As of December 31, 2024&nbsp;·&nbsp;Q4 Update
        </p>
      </div>

      {/* ══════════════ STATS BAR ══════════════ */}
      <div className="bg-[#081a36] px-5 sm:px-10 lg:px-16 py-4 sm:py-6">
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-12 lg:gap-x-16">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex items-center gap-2 sm:gap-4">
              <span className="text-[#2ec4f0] text-3xl sm:text-5xl font-light leading-none tabular-nums">
                {value}
              </span>
              <span className="text-white text-xs sm:text-base font-normal leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════ TABLE SECTION ══════════════ */}
      <div className="bg-[#dce8f0] px-4 py-6 sm:p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">

          {/* ── Desktop Table (sm+) ── */}
          <div className="hidden sm:block rounded-2xl overflow-hidden shadow-xl border border-[#c2d4e0]">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-[#0f2341] text-white text-sm font-semibold">
                  <th className="px-5 py-4 text-left w-[130px] leading-snug">
                    Therapeutic<br />Class
                  </th>
                  <th className="px-4 py-4 text-left w-[200px]">Platform Advantage</th>
                  <th className="px-4 py-4 text-left w-[140px]">Indication</th>
                  {STAGES.map((s) => (
                    <th key={s} className="px-2 py-4 text-center w-[80px] text-xs tracking-wide">
                      {s}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-center w-[160px]">Partner</th>
                </tr>
              </thead>
              <tbody>
                {GROUPED_ROWS.map(({ cls, rows: groupRows }, gi) =>
                  groupRows.map((row, ri) => (
                    <tr
                      key={`${gi}-${ri}`}
                      className={`border-b border-[#dce8f0] ${ri % 2 === 0 ? 'bg-white' : 'bg-[#f5f9fc]'}`}
                    >
                      {ri === 0 && (
                        <td
                          rowSpan={groupRows.length}
                          className="px-5 py-4 font-bold text-[#0f2341] text-base align-middle border-r border-[#dce8f0] border-l-4 border-l-[#3b9bb8]"
                        >
                          {cls}
                        </td>
                      )}
                      <td className="px-4 py-4 text-[#4a5e72] text-xs leading-snug align-middle border-r border-[#dce8f0]">
                        {row.platformAdvantage ?? ''}
                      </td>
                      <td className="px-4 py-4 text-[#1b3a6b] font-semibold align-middle border-r border-[#dce8f0] whitespace-pre-line">
                        {row.indication}
                      </td>
                      <td colSpan={5} className="px-4 py-4 align-middle border-r border-[#dce8f0]">
                        <PipelineProgress stages={row.stages} />
                      </td>
                      <td className="px-4 py-4 text-center align-middle">
                        <PartnerBadge name={row.partner.name} type={row.partner.type} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards (< sm) ── */}
          <div className="sm:hidden space-y-3">
            {GROUPED_ROWS.map(({ cls, rows: groupRows }, gi) => (
              <div key={gi} className="rounded-xl overflow-hidden shadow-md border border-[#c2d4e0]">

                {/* Class header */}
                <div className="bg-[#0f2341] px-4 py-2.5 flex items-center gap-2 border-l-4 border-l-[#3b9bb8]">
                  <span className="text-white font-bold text-sm">{cls}</span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#dce8f0]">
                  {groupRows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`px-4 py-4 ${ri % 2 === 0 ? 'bg-white' : 'bg-[#f5f9fc]'}`}
                    >
                      {/* Top row: indication + partner badge */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[#1b3a6b] text-sm leading-tight">
                            {row.indication}
                          </p>
                          {row.platformAdvantage && (
                            <p className="text-[#4a5e72] text-[11px] mt-1 leading-snug">
                              {row.platformAdvantage}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 pt-0.5">
                          <PartnerBadge name={row.partner.name} type={row.partner.type} />
                        </div>
                      </div>

                      {/* Progress bar with inline labels */}
                      <MobileProgress stages={row.stages} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Legend ── */}
          <div className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">

            {/* Stage legend */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#1b3a6b]">
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-[10px] sm:text-xs text-[#3a4f62] font-medium">Completed Stage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#3b82c4]">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3b82c4]" />
                </div>
                <span className="text-[10px] sm:text-xs text-[#3a4f62] font-medium">Active Stage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#c8d4e0]" />
                <span className="text-[10px] sm:text-xs text-[#3a4f62] font-medium">Upcoming Stage</span>
              </div>
            </div>

            {/* Partner type legend */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-2.5 py-1 rounded border-2 border-[#3b9bb8] text-[#1b3a6b] text-[10px] sm:text-xs font-semibold bg-white">
                Partnered
              </span>
              <span className="inline-block px-2.5 py-1 rounded border border-[#b0bfcc] text-[#4a5e72] text-[10px] sm:text-xs font-medium bg-white">
                In-house
              </span>
              <span className="inline-block px-2.5 py-1 rounded border border-[#b0bfcc] text-[#4a5e72] text-[10px] sm:text-xs font-medium bg-white">
                Undisclosed
              </span>
            </div>
          </div>

          {/* ── Footnote ── */}
          <p className="mt-3 text-[10px] sm:text-xs text-[#4a5e72] leading-relaxed">
            Program progression across clinical development stages. Clinical stages based on US FDA framework.
            {' '}Partners shown reflect current collaboration agreements as of the reporting date.
          </p>
        </div>
      </div>
    </div>
  );
}