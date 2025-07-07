
import { Link } from "@inertiajs/react";
import { ChevronRight  }  from "lucide-react";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import React from "react";// or use <a> if you're not using React Router

type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home icon */}
        <li className="flex items-center ">
          <a
            href="http://172.17.1.237:4010/dashboard-modules"
            className="flex items-center text-slate-700 hover:text-yellow-700"
          >
            <FaHome className="w-4 h-4 mr-1" />

          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              {/* Separator */}
              < ChevronRight className="w-4 h-4 " />

              {/* Breadcrumb link or current item */}
              {isLast ? (
                <span className="text-slate-700">{item.label}</span>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="text-slate-700 hover:text-yellow-700"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
