"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Users, DollarSign } from "lucide-react";
import { DashboardNav } from "@/components/shared/DashboardNav";

interface AffiliateData {
  affiliateCode: string;
  affiliateUrl: string;
  referralsCount: number;
  totalEarnings: number;
  referrals: any[];
}

export default function AffiliatePage() {
  const [data, setData] = useState<AffiliateData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadAffiliateData();
  }, []);

  const loadAffiliateData = async () => {
    try {
      const response = await fetch("/api/affiliate");
      if (response.ok) {
        const affiliateData = await response.json();
        setData(affiliateData);
      }
    } catch (error) {
      console.error("Error loading affiliate data:", error);
    }
  };

  const handleCopy = async () => {
    if (data) {
      await navigator.clipboard.writeText(data.affiliateUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 max-w-6xl py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Programme d'affiliation</h1>
          <p className="text-lg text-muted-foreground">
            Gagnez 30% de commission sur chaque vente générée par votre lien
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Parrainages</p>
                <p className="text-3xl font-bold">{data.referralsCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gains totaux</p>
                <p className="text-3xl font-bold">{data.totalEarnings}€</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-500">30%</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Commission</p>
                <p className="text-lg font-bold">Par vente</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Votre lien d'affiliation</h2>
          <p className="text-muted-foreground mb-6">
            Partagez ce lien pour gagner 30% sur chaque vente (5,70€ par unlock,
            11,70€ par abonnement Pro)
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={data.affiliateUrl}
              readOnly
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-background"
            />
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copier
                </>
              )}
            </button>
          </div>
        </div>

        {data.referrals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Vos parrainages</h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.referrals.map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 text-sm">{referral.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            referral.subscription_status === "pro"
                              ? "bg-purple-500/10 text-purple-600"
                              : "bg-gray-500/10 text-gray-600"
                          }`}
                        >
                          {referral.subscription_status === "pro" ? "Pro" : "Free"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(referral.created_at).toLocaleDateString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
