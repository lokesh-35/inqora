import { Paper, LimitationGroup, PotentialGap, ResearchDirection, ConsensusSnapshot } from '../types';

export const DEMO_QUERY = {
  topic: 'AI-based crop disease detection',
  question: 'Can deep learning reliably detect crop diseases in real-world open field conditions?',
  keywords: 'CNN, YOLO, plant disease, agriculture, vision transformer, field validation',
};

export const DEMO_CONSENSUS_SNAPSHOT: ConsensusSnapshot = {
  query: 'Can deep learning reliably detect crop diseases in real-world open field conditions?',
  verdict: 'Possibly',
  meter: {
    yesPercent: 55,
    possiblyPercent: 35,
    noPercent: 10,
  },
  consensusStatement:
    'The reviewed literature suggests: Yes, deep neural networks and vision transformers achieve high accuracy (up to 99.3%) on standard benchmarks, but diagnostic accuracy drops by 18% to 35% in uncontrolled field conditions without domain adaptation and diverse natural illumination training.',
  synthesizedAnswer:
    'Across 5 analyzed studies covering >500,000 agricultural images, convolutional networks and vision transformers demonstrate strong diagnostic precision when tested on clean, segmented datasets [1], [4]. However, systematic evaluations reveal significant performance degradation when models encounter unconstrained outdoor conditions with varying sunlight, overlapping foliage, and complex soil backgrounds [3], [5]. Recent field trials with lightweight Vision Transformers show promise for on-device detection, but require specialized data augmentation and domain adaptation to maintain reliability under real farm environments [2], [5].',
  rigorBreakdown: {
    totalStudies: 5,
    peerReviewed: 4,
    preprints: 1,
    methodsSummary: ['Deep CNN (ResNet, AlexNet)', 'Vision Transformers (ViT)', 'Systematic Meta-Review', 'SVM vs CNN Benchmark'],
    benchmarkAccuracy: '85.6% - 99.3% in lab vs 62% - 84% in field trials',
  },
};

export const DEMO_PAPERS: Paper[] = [
  {
    id: 'paper-abdu-2020',
    title: 'Machine learning for plant disease detection: an investigative comparison between support vector machine and deep learning',
    authors: ['A. M. Abdu', 'M. M. Mokji', 'U. U. Sheikh'],
    year: 2020,
    abstract: 'Plant disease detection is essential for food security and agriculture. In this work, an investigative comparison between traditional Support Vector Machine (SVM) and deep Convolutional Neural Networks (CNN) with transfer learning is conducted on potato leaf disease images. Diseased regions were segmented, and features were evaluated for early blight, late blight, and healthy samples.',
    source: 'Demo Data',
    url: 'https://doi.org/10.21533/pen.v8i1.1154',
    doi: '10.21533/pen.v8i1.1154',
    isOpenAccess: true,
    relevanceScore: 0.94,
    keyTakeaway: 'Deep CNN achieves F1 ~98.9% on segmented potato leaves, but requires manual leaf segmentation and was not tested under wild outdoor lighting.',
    studyType: 'Comparative Benchmark',
    sampleSize: '2,152 leaf samples',
    population: 'Solanum tuberosum (Potato crops, foliar tissue)',
    citationsCount: 142,
    consensusVerdict: 'Possibly',
    rigorBadge: 'Peer-Reviewed Study',
    methodology: 'Support Vector Machine (SVM) vs Deep CNN (transfer learning on pre-trained backbones) on leaf images with manual/semi-automated diseased region segmentation.',
    dataset: 'Potato leaf disease dataset (early blight, late blight, and healthy)',
    datasetSize: '2,152 potato leaf images',
    evaluationMetrics: ['Accuracy', 'F1-Score', 'Precision', 'Recall'],
    keyResults: 'Both models achieved high accuracy on segmented leaves. Deep CNN achieved F1 ≈ 98.9%, and SVM achieved F1 ≈ 96.1%.',
    limitations: [
      'Evaluated on a single crop species (potato) and only two disease classes.',
      'Relies heavily on segmented leaves against uniform, plain backgrounds.',
      'No validation on real-world open field conditions with complex backgrounds, shadows, or varying illumination.',
      'Modern vision architectures (e.g. Vision Transformers) were not evaluated.'
    ],
    futureWork: 'Extension to multiple crop varieties and real-time field trials under uncontrolled natural lighting.',
    researchProblem: 'Comparative efficacy of traditional feature-based SVM vs deep CNN on segmented crop disease leaves.',
    researchObjective: 'Determine whether deep transfer learning offers significant performance gains over classical SVM for potato disease classification.',
    mainConclusions: 'Deep CNN slightly outperforms SVM on clean segmented potato images, but both degrade when image backgrounds deviate from controlled lab setups.',
    isAnalyzed: true,
    isDemo: true,
    rawText: `Paper 1: Machine learning for plant disease detection: an investigative comparison between support vector machine and deep learning.
Authors: A. M. Abdu, M. M. Mokji, U. U. Sheikh (2020).
Abstract: Evaluates SVM and Deep CNN with transfer learning on 2,152 potato leaf images.
Section 3.2 Dataset: The dataset comprises 2,152 potato leaf images categorized into early blight, late blight, and healthy leaves with carefully segmented backgrounds.
Section 4 Results: Deep CNN achieved 98.9% F1-score; SVM achieved 96.1% F1-score.
Section 5 Discussion & Limitations: A critical limitation of this study is its confinement to a single crop (potato) and two specific disease types. The model was trained exclusively on isolated leaves cropped from uniform backgrounds. In real farming environments, leaves overlap and illumination varies dramatically, which was not evaluated.`
  },
  {
    id: 'paper-yin-2020',
    title: 'Transfer Learning-Based Search Model for Hot Pepper Diseases and Pests',
    authors: ['H. Yin', 'Y. Chai', 'R. Gao', 'Z. Sun'],
    year: 2020,
    abstract: 'Rapid diagnosis of crop diseases and pests is critical for precision farming. We propose a transfer learning-based image retrieval approach using deep features extracted from CNN backbones (ResNet50, VGG16) coupled with K-Nearest Neighbors (KNN) similarity search on a large-scale hot-pepper disease and pest image dataset.',
    source: 'Demo Data',
    url: 'https://doi.org/10.3390/agriculture10040439',
    doi: '10.3390/agriculture10040439',
    isOpenAccess: true,
    relevanceScore: 0.91,
    keyTakeaway: 'Deep feature extraction via ResNet50 yields 85.6% retrieval accuracy, but requires pre-cropped leaf patches and lacks real-time localization.',
    studyType: 'Feature Extraction & Retrieval',
    sampleSize: '17,623 cropped patches',
    population: 'Capsicum annuum (Hot pepper leaves, 25 pathological classes)',
    citationsCount: 88,
    consensusVerdict: 'Possibly',
    rigorBadge: 'Peer-Reviewed Study',
    methodology: 'Deep feature extraction via CNN (ResNet50, VGG16) combined with KNN similarity search for image retrieval and disease matching.',
    dataset: 'Hot-pepper disease and pest dataset (15 disease classes, 10 pest classes)',
    datasetSize: '17,623 cropped leaf images',
    evaluationMetrics: ['Search Accuracy', 'Top-1 Retrieval Rate', 'Top-5 Retrieval Rate'],
    keyResults: 'Best search accuracy of ~85.6% for diseases and ~93.6% for pests using ResNet50 deep features, outperforming standard baseline CNNs by 8–15%.',
    limitations: [
      'Focused strictly on a single crop (hot pepper) and relies on image retrieval rather than end-to-end classification/detection.',
      'Achieves only moderate accuracy (~85.6%) for diseases due to visual similarity among bacterial and fungal lesions.',
      'Requires expert-cropped close-up images of single diseased patches; does not perform automatic in-field object localization or multi-pest detection.',
      'High computational latency during vector index lookup across large reference libraries.'
    ],
    futureWork: 'Integration of real-time object detection models (e.g. YOLO) to automate ROI localization and expand to multi-crop registries.',
    researchProblem: 'Distinguishing complex foliar diseases and pests from visual similarity in hot pepper crops.',
    researchObjective: 'Develop an image retrieval framework for crop diseases that allows matching newly observed symptoms against an indexed gallery.',
    mainConclusions: 'Feature retrieval with transfer learning provides explainable matching, but requires manual cropping and struggles with fine-grained disease distinctions.',
    isAnalyzed: true,
    isDemo: true,
    rawText: `Paper 2: Transfer Learning-Based Search Model for Hot Pepper Diseases and Pests.
Authors: H. Yin, Y. Chai, R. Gao, Z. Sun (2020). Agriculture 10(4):439.
Methodology: Extracted ResNet50 deep representations and executed cosine KNN search against 17,623 cropped hot-pepper disease images across 15 classes.
Results: Top-1 retrieval accuracy reached 85.6% for diseases and 93.6% for pest damage.
Limitations: The pipeline necessitates pre-cropped leaf patches provided by trained agronomists. It lacks an end-to-end bounding-box detector, and performance drops when symptoms co-occur on the same leaf surface.`
  },
  {
    id: 'paper-ngugi-2024',
    title: 'Revolutionizing crop disease detection with computational deep learning: a comprehensive review',
    authors: ['H. N. Ngugi', 'J. K. Rono', 'E. M. Mwangi'],
    year: 2024,
    abstract: 'Deep learning has shown remarkable potential for plant pathology. This comprehensive review analyzes 180+ studies between 2016 and 2023 on deep learning models, benchmark datasets (PlantVillage, PlantDoc, CropDeep), and deployment bottlenecks. We examine key limitations across dataset diversity, field robustness, and architecture adoption.',
    source: 'Demo Data',
    url: 'https://doi.org/10.1007/s10661-024-12345-x',
    doi: '10.1007/s10661-024-12345-x',
    isOpenAccess: true,
    relevanceScore: 0.98,
    keyTakeaway: 'Across 180+ studies, deep learning models suffer a 18%–32% accuracy drop when transitioned from lab datasets to authentic outdoor fields.',
    studyType: 'Meta-Analysis & Systematic Review',
    sampleSize: '180+ studies (>500,000 images)',
    population: 'Multi-crop global agricultural field & benchmark cohorts',
    citationsCount: 310,
    consensusVerdict: 'Possibly',
    rigorBadge: 'High Rigor Review',
    methodology: 'Systematic literature review and meta-analysis of deep learning algorithms (CNNs, YOLO, ViT, Capsule Networks) and benchmark datasets for agricultural disease detection.',
    dataset: 'Meta-analysis across 180+ published studies; reviewed PlantVillage, PlantDoc, CropDeep, and field-collected datasets.',
    datasetSize: 'Meta-review covering >500,000 evaluated images across literature',
    evaluationMetrics: ['Cross-dataset generalization error', 'Inference latency', 'Field vs lab accuracy drop'],
    keyResults: 'Reviewed literature exhibits an average 18% to 32% accuracy drop when models trained on lab datasets (e.g. PlantVillage) are evaluated on genuine field images. Highlights severe dearth of studies utilizing Vision Transformers and Capsule Networks.',
    limitations: [
      'Documented systematic lack of multi-crop, multi-disease benchmark datasets under authentic field conditions.',
      'Preponderance of existing works focus on single-crop binary classification.',
      'Significant dearth of focus on emerging DL algorithms like Vision Transformers and Capsule Networks in agricultural vision.',
      'Few studies address real-time edge device inference with low battery/power consumption in remote farms.'
    ],
    futureWork: 'Development of open multi-crop field benchmarks, self-supervised pretraining on agricultural imagery, and unified multi-task disease detection frameworks.',
    researchProblem: 'Systematic fragmentation and field generalization failure of agricultural deep learning models.',
    researchObjective: 'Synthesize the state of crop disease detection, quantify field vs lab generalization performance drops, and map unaddressed research areas.',
    mainConclusions: 'Most published DL models cannot be deployed directly to real-world fields without substantial degradation. A unified multi-crop, multi-disease framework with robust field benchmarking is urgently needed.',
    isAnalyzed: true,
    isDemo: true,
    rawText: `Paper 3: Revolutionizing crop disease detection with computational deep learning: a comprehensive review.
Authors: H. N. Ngugi, J. K. Rono, E. M. Mwangi (2024). Environ Monit Assess 196(3):302.
Key Findings: The majority of published papers (over 70%) rely on the PlantVillage dataset or similar lab-acquired datasets with uniform backgrounds. When tested on real field images, models suffer an average accuracy drop of 25%.
Section 6 Identified Gaps:
1. Dataset Diversity: Most datasets are tailored to specific single crop types or controlled laboratory settings.
2. Architecture Innovation: There is a notable dearth of focus on emerging DL algorithms such as Vision Transformers (ViT) and Capsule Neural Networks for disease pattern modeling.
3. Multi-Disease Frameworks: Existing work mostly handles single diseases or binary status; there is a lack of unified frameworks that detect and localize multiple co-occurring diseases.`
  },
  {
    id: 'paper-mohanty-2016',
    title: 'Using Deep Learning for Image-Based Plant Disease Detection',
    authors: ['S. P. Mohanty', 'D. P. Hughes', 'M. Salathé'],
    year: 2016,
    abstract: 'Using a public dataset of 54,306 images of diseased and healthy plant leaves collected under controlled conditions, we trained a deep convolutional neural network to identify 14 crop species and 26 diseases. The trained model achieves an accuracy of 99.35% on a held-out test set.',
    source: 'Demo Data',
    url: 'https://doi.org/10.3389/fpls.2016.01419',
    doi: '10.3389/fpls.2016.01419',
    isOpenAccess: true,
    relevanceScore: 0.95,
    keyTakeaway: 'Deep CNN achieves 99.35% accuracy on 54k lab images, but accuracy falls drastically below 35% when tested on outdoor field images.',
    studyType: 'Controlled Lab Benchmark',
    sampleSize: '54,306 plant images',
    population: '14 crop species (Solanaceae, Rosaceae, Vitaceae, etc.)',
    citationsCount: 4280,
    consensusVerdict: 'Possibly',
    rigorBadge: 'Highly Cited (4,200+)',
    methodology: 'Deep CNN architectures (AlexNet, GoogLeNet) trained with transfer learning and from scratch on multi-crop leaf images.',
    dataset: 'PlantVillage dataset (14 crop species, 26 disease classes)',
    datasetSize: '54,306 images',
    evaluationMetrics: ['Top-1 Accuracy', 'Overall F1-Score'],
    keyResults: 'Achieved 99.35% overall accuracy on controlled test split using GoogLeNet transfer learning.',
    limitations: [
      'Dataset images were taken strictly under controlled laboratory conditions on plain grey or black backing boards.',
      'Demonstrated substantial drop in diagnostic accuracy when tested against independently collected smartphone images in outdoor fields.',
      'Employed early CNN architectures without spatial attention or transformer-based global context.',
      'Did not account for overlapping foliage, soil backgrounds, or weather-induced leaf wetness.'
    ],
    futureWork: 'Curating in-field image collections with mobile crowdsourcing and testing domain adaptation algorithms.',
    researchProblem: 'Can deep convolutional neural networks scale to classify dozens of crop diseases simultaneously from leaf imagery?',
    researchObjective: 'Establish deep learning feasibility for wide-scale automated crop disease classification across multiple plant families.',
    mainConclusions: 'Deep learning is highly effective for visual crop disease classification in controlled settings, but lab accuracy does not guarantee real-world agricultural reliability.',
    isAnalyzed: true,
    isDemo: true,
    rawText: `Paper 4: Using Deep Learning for Image-Based Plant Disease Detection.
Authors: S. P. Mohanty, D. P. Hughes, M. Salathé (2016). Frontiers in Plant Science.
Data: 54,306 images across 14 crop species and 26 diseases.
Results: 99.35% accuracy under 80-20 train/test split.
Critical Limitation: The authors noted: "When tested on a set of images taken under completely different conditions than those used for training (e.g. real field images with complex background), the accuracy dropped substantially (often below 35%)."`
  },
  {
    id: 'paper-chen-2024',
    title: 'Edge-Deployed Vision Transformers for Real-Time Plant Disease Segmentation in Open Sunlight',
    authors: ['S. Chen', 'W. Zhang', 'T. Liu', 'X. Zhao'],
    year: 2024,
    abstract: 'Field deployment of computer vision in agriculture suffers from unpredictable sunlight glare, specular reflection, and motion blur. We design MobileViT-Agri, an edge-optimized hybrid vision transformer quantized for on-device inference on NVIDIA Jetson Orin Nano, evaluated across 4,200 tomato and maize field images.',
    source: 'Demo Data',
    url: 'https://doi.org/10.1016/j.compag.2024.108991',
    doi: '10.1016/j.compag.2024.108991',
    isOpenAccess: true,
    relevanceScore: 0.96,
    keyTakeaway: 'Quantized MobileViT achieves 91.4% mAP in daylight, but still requires localized shadow compensation and multi-spectral sensors for overcast conditions.',
    studyType: 'Edge Field Experiment',
    sampleSize: '4,200 open-sunlight images',
    population: 'Solanum lycopersicum & Zea mays in active agronomic field trials',
    citationsCount: 38,
    consensusVerdict: 'Yes',
    rigorBadge: 'Open Field Trial',
    methodology: 'Hybrid MobileViT backbone with INT8 quantization, self-attention feature pyramid, and on-farm edge validation under natural sunlight.',
    dataset: 'AgriField-24 real-farm open dataset (tomato, maize, soybean)',
    datasetSize: '4,200 high-resolution field images',
    evaluationMetrics: ['mAP@50', 'FPS on Jetson Nano', 'Latency (ms)', 'Solar Glare Robustness'],
    keyResults: '91.4% mAP at 28 FPS on edge hardware; maintains 82.5% accuracy under direct 80,000-lux sunlight glare.',
    limitations: [
      'Model size and thermal throttling constrain continuous inference to 45 minutes on uncooled field drones.',
      'Performance degrades by 19% under extreme wet canopy specular reflection after rain.',
      'Requires active illumination or multi-spectral sensor fusion for night and deep shade conditions.',
    ],
    futureWork: 'Multi-modal fusion integrating thermal and NIR sensors with edge transformers for 24/7 crop monitoring.',
    researchProblem: 'Overcoming solar glare and real-time edge hardware latency for open-field crop disease segmentation.',
    researchObjective: 'Design and validate an edge-deployable transformer that maintains high segmentation accuracy under natural open sunlight.',
    mainConclusions: 'Edge-optimized Vision Transformers can bridge the lab-to-field performance gap when paired with illumination-aware data augmentation.',
    isAnalyzed: true,
    isDemo: true,
    rawText: `Paper 5: Edge-Deployed Vision Transformers for Real-Time Plant Disease Segmentation in Open Sunlight.
Authors: S. Chen, W. Zhang, T. Liu, X. Zhao (2024). Computers and Electronics in Agriculture 219:108991.
Results: MobileViT achieved 91.4% mAP at 28 FPS.
Limitations: Evaluated on Jetson Nano under direct sunlight; accuracy dropped by 19% under wet leaves and specular reflections.`
  }
];

export const DEMO_LIMITATION_GROUPS: LimitationGroup[] = [
  {
    id: 'lim-group-1',
    category: 'Dataset Diversity & Environmental Realism',
    limitation: 'Reliance on Controlled Lab Conditions & Single-Crop Datasets',
    description: 'The collected studies predominantly evaluate models on isolated leaves captured against plain, uniform laboratory backgrounds (e.g., PlantVillage), with several focusing on only a single crop variety.',
    supportingPaperIds: ['paper-abdu-2020', 'paper-yin-2020', 'paper-ngugi-2024', 'paper-mohanty-2016'],
    supportingPaperTitles: [
      'Abdu et al. (2020)',
      'Yin et al. (2020)',
      'Ngugi et al. (2024)',
      'Mohanty et al. (2016)'
    ],
    evidence: [
      {
        paperId: 'paper-abdu-2020',
        paperTitle: 'Abdu et al. (2020)',
        section: 'Section 5 (Discussion)',
        passage: 'Trained exclusively on 2,152 potato leaf images on carefully segmented backgrounds; no evaluation on other crops or varied field lighting.'
      },
      {
        paperId: 'paper-yin-2020',
        paperTitle: 'Yin et al. (2020)',
        section: 'Section 4 (Method Limitations)',
        passage: 'Restricted to hot-pepper leaves and required expert-cropped images of individual symptom regions.'
      },
      {
        paperId: 'paper-mohanty-2016',
        paperTitle: 'Mohanty et al. (2016)',
        section: 'Section 4 (Field Validation)',
        passage: 'Accuracy dropped substantially (below 35% in tests) when evaluated on outdoor images with unconstrained field backgrounds.'
      },
      {
        paperId: 'paper-ngugi-2024',
        paperTitle: 'Ngugi et al. (2024)',
        section: 'Section 6 (Meta-Analysis)',
        passage: 'Over 70% of evaluated papers rely on lab-acquired datasets; documented an average 18–32% drop when applied to field conditions.'
      }
    ]
  },
  {
    id: 'lim-group-2',
    category: 'Architecture Exploration',
    limitation: 'Predominance of Legacy CNNs and Dearth of Modern Vision Architectures',
    description: 'The reviewed literature concentrates primarily on standard CNN backbones (AlexNet, ResNet, VGG) or traditional SVMs, leaving state-of-the-art architectures like Vision Transformers (ViT) and Capsule Networks underexplored for crop disease diagnosis.',
    supportingPaperIds: ['paper-abdu-2020', 'paper-ngugi-2024'],
    supportingPaperTitles: ['Abdu et al. (2020)', 'Ngugi et al. (2024)'],
    evidence: [
      {
        paperId: 'paper-ngugi-2024',
        paperTitle: 'Ngugi et al. (2024)',
        section: 'Section 6.2 (DL Models)',
        passage: 'Notes a critical "dearth of focus on emerging DL algorithms like capsule neural networks and vision transformers" for plant pathology.'
      },
      {
        paperId: 'paper-abdu-2020',
        paperTitle: 'Abdu et al. (2020)',
        section: 'Section 5 (Model Scope)',
        passage: 'Only evaluated classical SVM against conventional CNN transfer learning; modern attention-guided architectures were omitted.'
      }
    ]
  },
  {
    id: 'lim-group-3',
    category: 'Deployment & Multi-Disease Localization',
    limitation: 'Absence of Unified Multi-Disease Detection & Localization Frameworks',
    description: 'Existing papers predominantly frame disease detection as single-label image classification on cropped leaves rather than end-to-end multi-symptom object detection and localization in natural crop canopies.',
    supportingPaperIds: ['paper-yin-2020', 'paper-ngugi-2024'],
    supportingPaperTitles: ['Yin et al. (2020)', 'Ngugi et al. (2024)'],
    evidence: [
      {
        paperId: 'paper-yin-2020',
        paperTitle: 'Yin et al. (2020)',
        section: 'Section 3 (Pipeline)',
        passage: 'KNN retrieval requires expert-cropped regions and does not localize multiple co-occurring lesions on a single leaf or plant canopy.'
      },
      {
        paperId: 'paper-ngugi-2024',
        paperTitle: 'Ngugi et al. (2024)',
        section: 'Section 7 (Future Frameworks)',
        passage: 'Emphasizes that "the majority of research concentrates on individual diseases" and advocates for "a unified framework that harnesses multi-task or ensemble DL to handle co-occurring diseases".'
      }
    ]
  }
];

export const DEMO_POTENTIAL_GAPS: PotentialGap[] = [
  {
    id: 'gap-1',
    category: 'Data Gaps',
    title: 'Generalization and Validation Across Uncontrolled Open-Field Conditions vs. Lab Benchmarks',
    description: 'Models trained on isolated leaves or uniform laboratory datasets (e.g. PlantVillage) experience severe diagnostic accuracy drops (18% to 60%) when evaluated on open-field agricultural imagery with natural sunlight glare, foliage overlap, and shadows.',
    supportingPaperIds: ['paper-abdu-2020', 'paper-yin-2020', 'paper-mohanty-2016', 'paper-ngugi-2024'],
    supportingPaperTitles: ['Abdu et al. (2020)', 'Yin et al. (2020)', 'Mohanty et al. (2016)', 'Ngugi et al. (2024)'],
    evidence: [
      {
        paperId: 'paper-abdu-2020',
        paperTitle: 'Abdu et al. (2020)',
        reportedFact: 'Evaluated solely on potato with segmented uniform backgrounds; no cross-crop validation.',
        passage: 'The model was trained exclusively on isolated leaves cropped from uniform backgrounds.',
        section: 'Section 5'
      },
      {
        paperId: 'paper-yin-2020',
        paperTitle: 'Yin et al. (2020)',
        reportedFact: 'Model focused only on hot pepper; accuracy was moderate (~85.6%) for diseases.',
        passage: 'Focused on a single crop (hot pepper) and KNN search approach. Requires expert-cropped images.',
        section: 'Section 4'
      },
      {
        paperId: 'paper-mohanty-2016',
        paperTitle: 'Mohanty et al. (2016)',
        reportedFact: 'Demonstrated severe degradation (>60% drop) when models were deployed to field images.',
        passage: 'When tested on a set of images taken under completely different conditions than those used for training... accuracy dropped substantially (often below 35%).',
        section: 'Section 4'
      }
    ],
    relatedLimitations: [
      'Single-crop confinement (potato, pepper)',
      'Lab-controlled background dependence',
      'High domain shift between lab and open-field imaging'
    ],
    whyItMayBeAGap: 'The collected papers repeatedly demonstrate that models achieving >95% accuracy in controlled conditions degrade sharply in real-world fields, while existing datasets remain siloed by crop type.',
    potentialDirection: 'Develop standardized open-field benchmark datasets collected across variable weather conditions, combined with domain-adversarial adaptation algorithms to bridge the lab-to-field performance gap.',
    confidence: 'Strong evidence',
    cautionNotice: 'Identified as a potential research gap based on the collected literature; this does not assert absolute novelty across all global publications.'
  },
  {
    id: 'gap-2',
    category: 'Methodological Gaps',
    title: 'Exploration of Modern Vision Transformers (ViT) & Capsule Networks for Lesion Representation',
    description: 'Among the collected papers, researchers predominantly employ legacy CNNs (AlexNet, GoogLeNet, ResNet) or SVMs. Modern transformer-based architectures with global self-attention or Capsule Networks that preserve spatial lesion hierarchies remain largely unevaluated in this problem space.',
    supportingPaperIds: ['paper-abdu-2020', 'paper-ngugi-2024'],
    supportingPaperTitles: ['Abdu et al. (2020)', 'Ngugi et al. (2024)'],
    evidence: [
      {
        paperId: 'paper-ngugi-2024',
        paperTitle: 'Ngugi et al. (2024)',
        reportedFact: 'Systematic review documented an explicit shortage of studies evaluating ViTs or Capsule Networks for plant pathology.',
        passage: 'Highlights a "dearth of focus on emerging DL algorithms like capsule neural networks and vision transformers".',
        section: 'Section 6.2'
      },
      {
        paperId: 'paper-abdu-2020',
        paperTitle: 'Abdu et al. (2020)',
        reportedFact: 'Study was limited to classical SVM and transfer CNN without exploring attention mechanisms.',
        passage: 'Investigative comparison strictly between support vector machine and deep CNN.',
        section: 'Section 1'
      }
    ],
    relatedLimitations: [
      'Lack of hierarchical spatial modeling in lesions',
      'Over-reliance on standard convolutional receptive fields',
      'Absence of self-attention mechanisms for fine-grained foliar texture'
    ],
    whyItMayBeAGap: 'The systematic review by Ngugi et al. explicitly confirms that modern transformer and capsule architectures are underexplored for crop pathology despite their proven benefits in other medical and botanical imaging domains.',
    potentialDirection: 'Systematically benchmark lightweight Vision Transformers (e.g., MobileViT, Swin-T) against conventional CNN backbones under varying degrees of foliar occlusion and lighting variation.',
    confidence: 'Strong evidence',
    cautionNotice: 'This suggests a promising direction based on reviewed studies; recent preprints may have begun early explorations.'
  },
  {
    id: 'gap-3',
    category: 'Underexplored Questions',
    title: 'End-to-End Real-Time Multi-Disease Localization in Unsegmented Plant Canopies',
    description: 'The collected literature indicates that detecting multiple co-occurring diseases directly within whole-plant canopies (without pre-cropping individual leaves) represents a potential research gap. Current workflows require manual leaf segmentation or single-label matching.',
    supportingPaperIds: ['paper-yin-2020', 'paper-ngugi-2024'],
    supportingPaperTitles: ['Yin et al. (2020)', 'Ngugi et al. (2024)'],
    evidence: [
      {
        paperId: 'paper-yin-2020',
        paperTitle: 'Yin et al. (2020)',
        reportedFact: 'System requires manually cropped patches and lacks bounding-box multi-disease localization.',
        passage: 'Requires expert-cropped images; not an end-to-end classifier or multi-symptom detector.',
        section: 'Section 4'
      },
      {
        paperId: 'paper-ngugi-2024',
        paperTitle: 'Ngugi et al. (2024)',
        reportedFact: 'Advocates for unified multi-disease frameworks that handle co-occurring diseases on real plants.',
        passage: 'Advocates "a unified framework that harnesses an ensemble of ML and DL" to handle multiple diseases simultaneously.',
        section: 'Section 7'
      }
    ],
    relatedLimitations: [
      'Manual cropping requirement',
      'Single-label classification assumptions',
      'Failure to handle co-occurring pathology on same plant canopy'
    ],
    whyItMayBeAGap: 'Farmers in field settings encounter multiple diseases and pests on the same plant canopy simultaneously; existing studies rarely model this multi-label, multi-symptom reality.',
    potentialDirection: 'Develop multi-task object detection and instance segmentation models trained to simultaneously localize multiple foliar lesions across unsegmented plant canopies.',
    confidence: 'Moderate evidence',
    cautionNotice: 'Further investigation may be useful to determine practical viability on resource-constrained agricultural edge devices.'
  },
  {
    id: 'gap-4',
    category: 'Geographic Gaps',
    title: 'Geographic and Climatic Underrepresentation in Agricultural Training Corpora',
    description: 'The vast majority of training images in benchmark datasets originate from controlled facilities in North America and East Asia, with minimal representation of crops and disease variants endemic to Sub-Saharan Africa and South America.',
    supportingPaperIds: ['paper-ngugi-2024', 'paper-mohanty-2016'],
    supportingPaperTitles: ['Ngugi et al. (2024)', 'Mohanty et al. (2016)'],
    evidence: [
      {
        paperId: 'paper-ngugi-2024',
        paperTitle: 'Ngugi et al. (2024)',
        reportedFact: 'Meta-review documented severe skew in geographical origin of evaluated agricultural benchmarks.',
        passage: 'Over 82% of evaluated datasets were collected in high-income research laboratories; smallholder tropical field environments are largely absent.',
        section: 'Section 5.3'
      }
    ],
    relatedLimitations: [
      'Lack of tropical disease phenotypes',
      'Absence of smallholder farm soil and crop context'
    ],
    whyItMayBeAGap: 'Global food security relies heavily on smallholder farming in developing nations where disease manifestations differ due to humidity, micro-climates, and soil nutrition.',
    potentialDirection: 'Establish collaborative cross-continental open datasets targeting staple crops (cassava, millet, sorghum) across smallholder farms in tropical agro-ecological zones.',
    confidence: 'Moderate evidence',
    cautionNotice: 'Preliminary regional initiatives exist but lack unified standardization and open public benchmark access.'
  },
  {
    id: 'gap-5',
    category: 'Conflicting Evidence',
    title: 'Discrepancy Between Generic Pretrained Representations and Domain-Specific Foliar Features',
    description: 'Literature reveals conflicting outcomes regarding whether transfer learning from general ImageNet models provides sufficient discriminative power for fine-grained botanical diseases versus self-supervised agricultural pretraining.',
    supportingPaperIds: ['paper-abdu-2020', 'paper-yin-2020', 'paper-chen-2024'],
    supportingPaperTitles: ['Abdu et al. (2020)', 'Yin et al. (2020)', 'Chen et al. (2024)'],
    evidence: [
      {
        paperId: 'paper-abdu-2020',
        paperTitle: 'Abdu et al. (2020)',
        reportedFact: 'Transfer learning demonstrated minimal gain over traditional tuned SVMs on segmented potato leaves.',
        passage: 'Deep CNN with ImageNet weights achieved 98.9% while classical SVM with handcrafted texture features achieved 96.1%.',
        section: 'Section 4'
      },
      {
        paperId: 'paper-chen-2024',
        paperTitle: 'Chen et al. (2024)',
        reportedFact: 'Agricultural-specific feature tuning was critical to prevent false alarms under open solar glare.',
        passage: 'Standard ImageNet feature backbones suffered 31% false positive rates under direct sunlight glare without specialized agronomic fine-tuning.',
        section: 'Section 3.4'
      }
    ],
    relatedLimitations: [
      'ImageNet feature domain mismatch',
      'Inconsistent findings across model families'
    ],
    whyItMayBeAGap: 'Conflicting findings hinder clear architectural guidelines for researchers deciding between lightweight off-the-shelf backbones and computationally expensive domain-specific foundation models.',
    potentialDirection: 'Conduct a controlled empirical comparison of ImageNet transfer learning vs. self-supervised agricultural pretraining across matched compute and parameter budgets.',
    confidence: 'Strong evidence',
    cautionNotice: 'Evaluations depend heavily on the specific target crops and disease severity levels evaluated.'
  }
];

export const DEMO_RESEARCH_DIRECTIONS: ResearchDirection[] = [
  {
    id: 'dir-1',
    gapId: 'gap-1',
    title: 'Multi-Crop Cross-Domain Adaptation with Field Data Augmentation',
    problem: 'Models trained on single-crop or controlled lab images fail to generalize to outdoor field imagery due to lighting, background clutter, and crop variety variance.',
    proposedApproach: 'Aggregate public datasets (PlantVillage, PlantDoc, CropDeep) and combine with in-field smartphone datasets. Apply domain-adversarial training and physics-based synthetic weather augmentation (shadows, rain gloss, direct sunlight).',
    methodology: [
      '1. Compile and normalize a unified multi-crop benchmark combining PlantVillage, PlantDoc, and CropDeep.',
      '2. Implement domain-adversarial neural network (DANN) heads to align feature distributions between lab and field domains.',
      '3. Apply synthetic environmental augmentations (specular highlights, soil noise, leaf occlusion).',
      '4. Fine-tune pre-trained Vision Transformers (e.g. Swin-T, DeiT) on the composite dataset.',
      '5. Validate with zero-shot and few-shot cross-crop testing on held-out field farms.'
    ],
    dataset: 'Composite of PlantVillage (lab), PlantDoc (field), and CropDeep (outdoor canopy), supplemented with 2,000 field-collected smartphone photos.',
    models: ['Vision Transformer (DeiT / Swin-T)', 'ResNet-50 Baseline', 'Domain-Adversarial Neural Network (DANN)'],
    metrics: ['Cross-Dataset Top-1 Accuracy', 'Macro F1-Score', 'Domain Discrepancy (A-distance)', 'Field Generalization Drop (%)'],
    technologies: ['PyTorch / PyTorch Lightning', 'Albumentations', 'Detectron2', 'Timm', 'Torchvision']
  },
  {
    id: 'dir-2',
    gapId: 'gap-2',
    title: 'Evaluating Vision Transformers & Capsule Networks for Fine-Grained Foliar Lesions',
    problem: 'Standard CNNs often miss subtle spatial hierarchies and long-range contextual relationships among small diseased lesions on leaves.',
    proposedApproach: 'Implement and benchmark Vision Transformers (ViT, Swin Transformer) and Capsule Networks against conventional CNN baselines on fine-grained plant pathology tasks.',
    methodology: [
      '1. Select fine-grained disease datasets exhibiting early-stage vs late-stage blight and fungal spots.',
      '2. Implement Capsule Network with dynamic routing to preserve spatial pose and lesion orientation.',
      '3. Implement patch-based Vision Transformer with shifted window self-attention (Swin Transformer).',
      '4. Compare attention heatmaps (via Grad-CAM and Transformer Attribution) against expert pathologist annotations.',
      '5. Benchmark parameter efficiency, training convergence, and inference FLOPs.'
    ],
    dataset: 'PlantVillage multi-crop split + Abdu et al. segmented potato blight + Yin et al. hot pepper dataset.',
    models: ['Swin Transformer', 'DeiT', 'Capsule Neural Network (Dynamic Routing)', 'EfficientNet-B4 Baseline'],
    metrics: ['Top-1 Accuracy', 'F1-Score', 'Attention Localization Intersection-over-Union (IoU)', 'Inference FLOPs'],
    technologies: ['PyTorch', 'Hugging Face Transformers', 'Timm', 'Captum (Interpretability)']
  },
  {
    id: 'dir-3',
    gapId: 'gap-3',
    title: 'End-to-End Multi-Disease Real-Time Object Detection on Edge Devices',
    problem: 'Current retrieval and classification models require manual leaf cropping and cannot handle multiple co-occurring diseases on whole plants in real-time.',
    proposedApproach: 'Develop a lightweight multi-task object detection pipeline using YOLOv8/YOLOv9 or RT-DETR optimized for edge deployment on farm drones and handheld agricultural mobile scanners.',
    methodology: [
      '1. Annotate full-canopy agricultural images with bounding boxes for multiple co-occurring diseases and pest lesions.',
      '2. Train a real-time detector (YOLOv8x / RT-DETR) with multi-label bounding-box regression.',
      '3. Quantize the trained model to INT8 using ONNX Runtime / TensorRT for mobile edge deployment.',
      '4. Benchmark frame-rate (FPS), battery consumption, and mAP50:95 under fluctuating natural daylight.'
    ],
    dataset: 'PlantDoc field-annotated dataset + CropDeep outdoor detection benchmark.',
    models: ['YOLOv8 / YOLOv9', 'RT-DETR (Real-Time Detection Transformer)', 'MobileNetV3-SSD'],
    metrics: ['mAP@0.5', 'mAP@0.5:0.95', 'Inference Latency (ms)', 'Edge Power Consumption (Watts)'],
    technologies: ['Ultralytics YOLO', 'ONNX Runtime', 'TensorRT', 'OpenCV']
  }
];
