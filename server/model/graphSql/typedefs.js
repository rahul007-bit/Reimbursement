import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Reimbursement {
    id: ID!
    certificate: ID!
    user_id: ID!
    bankDetails: BankDetails!
    amountToReimburse: Float!
    status: String!
    reimbursementDetails: Certificate!
    department: String!
    assignedTo: String
    approvedByAdmin: Boolean!
    approvedBySubAdmin: Boolean!
    approvedByReceptionist: Boolean!
    remarks: Remarks
  }

  type Remarks {
    bySubAdmin: String
    byAdmin: String
    byReceptionist: String
  }

  type BankDetails {
    accountNumber: String!
    IFSCode: String!
  }

  type Certificate {
    certificate_name: String!
    questions: [Question!]!
  }

  type options {
    value: String!
    id: String!
  }

  type Question {
    _id: ID!
    question: String!
    options: [options]
    type: String!
    checkbox: [options]
    dropdown: [options]
    required: Boolean!
  }

  type ResponseCountResult {
    count: Int!
    certificate_name: String!
  }

  type ResponseCount {
    status: String!
    message: String!
    success: Boolean!
    data: [ResponseCountResult!]
  }

  type Object {
    name: String!
    id: String!
  }

  type ResponseStatusCountResult {
    count: Int!
    status: String!
    certificate_name: [Object!]
  }
  type ResponseStatusCountDepartmentWise_Result {
    count: Int!
    status: String
    department: String!
    certificate_name: [Object!]
  }

  type ResponseStatusCount {
    status: String!
    message: String!
    success: Boolean!
    data: [ResponseStatusCountResult]
  }

  type ResponseStatusCountDepartmentWise {
    status: String!
    message: String!
    success: Boolean!
    data: [ResponseStatusCountDepartmentWise_Result]
  }

  type ObjectCertificate {
    status: String!
    id: String!
  }

  type StatusCertificateCount_data {
    count: String!
    status: [ObjectCertificate]
    certificate_name: String!
  }

  type StatusCertificateCount_response {
    status: String!
    message: String!
    success: Boolean!
    data: [StatusCertificateCount_data]
  }

  type Query {
    getReimbursements: [Reimbursement!]!
    getReimbursement(id: ID!): Reimbursement!
    getReimbursementsCount: ResponseCount
    getCertificates: [Certificate!]!
    getCertificate(id: ID!): Certificate!
    getReimbursementsStatusCount: ResponseStatusCount
    getReimbursementsDepartmentWiseStatus: ResponseStatusCountDepartmentWise
    getReimbursementsDepartmentWise: ResponseStatusCountDepartmentWise
    getReimbursementsCertificateStatusCount: StatusCertificateCount_response
  }
`;

export default typeDefs;
