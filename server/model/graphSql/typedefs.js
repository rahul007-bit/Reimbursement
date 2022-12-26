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

  type Query {
    getReimbursements: [Reimbursement!]!
    getReimbursement(id: ID!): Reimbursement!
    getReimbursementsCount: ResponseCount
    getCertificates: [Certificate!]!
    getCertificate(id: ID!): Certificate!
    getReimbursementsStatusCount: ResponseStatusCount
    getReimbursementsDepartmentWiseStatus: ResponseStatusCountDepartmentWise
    getReimbursementsDepartmentWise: ResponseStatusCountDepartmentWise
  }
`;

export default typeDefs;
