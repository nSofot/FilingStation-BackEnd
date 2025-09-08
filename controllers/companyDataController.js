import CompanyData from "../models/companyData.js";

export async function getCompanyData(req, res) {
    try {
        const companyData = await CompanyData.findOne({ companyId: "01" });

        if (!companyData) {
            return res.status(404).json({ error: "Company not found" });
        }

        res.status(200).json(companyData);
    } catch (error) {
        console.error("Error fetching company data:", error.message);
        res.status(500).json({ error: error.message });
    }
}


export async function createCompanyData(req, res) {
    try {
        const companyData = await CompanyData.create(req.body);
        res.status(201).json(companyData);
    } catch (error) {
        console.error("Error creating company data:", error.message);
        res.status(500).json({ error: error.message });
    }
}


export async function updateCompanyData(req, res) {
    try {
        const companyData = await CompanyData.findOneAndUpdate({ companyId: "01" }, req.body, { new: true });
        res.status(200).json(companyData);
    } catch (error) {
        console.error("Error updating company data:", error.message);
        res.status(500).json({ error: error.message });
    }
}