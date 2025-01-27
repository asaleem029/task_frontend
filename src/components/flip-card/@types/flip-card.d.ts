export interface PlanData {
  /**
   * A unique identifier for the feature
   */
  planId: number;

  /**
   * Name of the plan
   */
  planName: string;

  /**
   * Price of the plan
   */
  planPrice: number;

  /**
   * Annual discount for the plan in percentage
   */
  planAnnualPaymentDiscount: number;

  /**
   * Is Plan active or not
   */
  planIsActive: boolean;

  /**
   * Description of plan
   */
  planDescription: string;

  /**
   * Array of Quota included in the plan
   */
  planQuotas: PlanQuotas[];
}

export interface PlanQuotas {
  /**
   * Product Name
   */
  productName: string;

  /**
   * Creation limit
   */
  creationLimit: number;

  /**
   * Updation limit
   */
  updationLimit: number;

  /**
   * UnlimitedCreations limit
   */
  unlimitedCreations: boolean;

  /**
   * UnlimitedUpdations limit
   */
  unlimitedUpdations: boolean;

  /**
   * Array of included features
   */
  features: Feature[];

  /**
   * Array of excluded features
   */
  excludedFeatures: excludedFeature[];
}

export interface Feature {
  /**
   * The Name of the feature
   */
  featureName: string;

  /**
   * The Description of the feature
   */
  featureDescription?: string;
}

export interface excludedFeature {
  /**
   * The Name of the feature
   */
  featureName: string;

  /**
   * The Description of the feature
   */
  featureDescription?: string;
}
