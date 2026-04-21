import { notFound } from "next/navigation";
import { Metadata } from "next";
import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";
import { PuppyDetailsClient } from "@/components/PuppyDetailsClient";
import { generatePuppyMetadata, seoConfig } from "@/lib/seo";

type Props = {
    params: Promise<{ id: string }>
}

const siteUrl = "https://cavalierkingcharlesrehomingcenter.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    await dbConnect();
    
    try {
        const doc = await Puppy.findById(id).lean();
        if (doc) {
            const p = doc as any;
            return generatePuppyMetadata({
                puppyName: p.name || "Cavalier Puppy",
                puppyBreed: p.breed || "Cavalier King Charles Spaniel",
                puppyAge: p.age || "Puppy",
                puppyDescription: p.description || "",
                puppyImage: p.image || "",
                puppyId: id,
            });
        }
    } catch (e) {
        console.error("Error generating metadata:", e);
    }
    
    return {
        title: "Puppy Not Found",
    };
}

export default async function PuppyPage({ params }: Props) {
    const { id } = await params;
    await dbConnect();

    let puppy: any = null;
    let relatedPuppies: any[] = [];
    let productSchema: any = null;

    try {
        const doc = await Puppy.findById(id).lean();
        if (doc) {
            const p = JSON.parse(JSON.stringify(doc));
            puppy = {
                ...p,
                id: p._id,
                gender: p.gender || "Unknown",
                fee: p.fee || "Contact us",
                nannyFee: p.nannyFee || "Contact us",
            };

            if (p.image) {
                productSchema = {
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": `${p.name || "Cavalier Puppy"} - ${p.breed || "Cavalier King Charles Spaniel"}`,
                    "description": p.description || `Meet ${p.name || "this adorable Cavalier King Charles Spaniel"} looking for a loving forever home.`,
                    "image": p.image,
                    "url": `${siteUrl}/puppies/${id}`,
                    "brand": {
                        "@type": "Brand",
                        "name": seoConfig.siteName
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": p.fee || "0",
                        "priceCurrency": "USD",
                        "availability": p.status === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
                        "seller": {
                            "@type": "Organization",
                            "name": seoConfig.siteName
                        }
                    }
                };
            }

            const relatedRaw = await Puppy.find({
                _id: { $ne: doc._id },
                breed: p.breed,
                status: "available"
            }).limit(3).lean();

            let relatedDocs = JSON.parse(JSON.stringify(relatedRaw));

            if (relatedDocs.length < 3) {
                const moreRaw = await Puppy.find({
                    _id: { $ne: doc._id, $nin: relatedDocs.map((d: any) => d._id) },
                    status: "available"
                }).limit(3 - relatedDocs.length).lean();
                relatedDocs = [...relatedDocs, ...JSON.parse(JSON.stringify(moreRaw))];
            }

            relatedPuppies = relatedDocs.map((rp: any) => ({
                id: rp._id,
                name: rp.name,
                breed: rp.breed,
                age: rp.age,
                image: rp.image,
                status: rp.status,
                description: rp.description,
            }));
        }
    } catch (e) {
        return notFound();
    }

    if (!puppy) {
        notFound();
    }

    return (
        <>
            {productSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
                />
            )}
            <PuppyDetailsClient puppy={puppy} relatedPuppies={relatedPuppies} />
        </>
    );
}
